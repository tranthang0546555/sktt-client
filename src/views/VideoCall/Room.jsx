import React, { useEffect, useState } from 'react';

import { Container, Typography } from '@mui/material'
import { useRef } from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import Peer from 'simple-peer'

const useStyles = makeStyles(theme => ({
    video: {
        width: '100%',
        height: 'auto',
    }
}))

// const socket = io('http://localhost:5000')



function Room({ codeRoom }) {
    const classes = useStyles()


    const myVideo = useRef()
    const friendVideo = useRef()
    const user = useSelector(state => state.user.current.user)

    const socket = useRef()

    const peersRef = useRef([])
    const [peers, setPeers] = useState([])

    const [friend, setFriend] = useState(null)
    const [friendId, SetFriendId] = useState(null)

    const { enqueueSnackbar } = useSnackbar()
    // console.log(friend)


    useEffect(() => {

        // socket.current = io('http://localhost:5000', { transports: ['websocket'] });
        socket.current = io('https://suckhoetamthan.herokuapp.com', { transports: ['websocket'] });


        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                myVideo.current.srcObject = stream;

                socket.current.emit('join-room', codeRoom, user)

                socket.current.on('other-user', (userOtherInRoom, friend) => {
                    if (friend) {
                        const friendId = userOtherInRoom[0]
                        setFriend(friend)
                        SetFriendId(friendId)

                        const peer = createPeer(friendId, socket.current.id, stream)

                        peersRef.current.push({
                            peerId: friendId,
                            peer
                        })

                        setPeers(pre => [...pre, peer])
                    }
                })

                socket.current.on('user joined', payload => {
                    console.log(payload)
                    setFriend(payload.callerInfo)
                    SetFriendId(payload.callerId)
                    enqueueSnackbar('Đã có người vào phòng', { variant: 'info' })

                    const peer = addPeer(payload.signal, payload.callerId, stream)

                    peer.on('stream', str => {
                        friendVideo.current.srcObject = str
                    })

                    peersRef.current.push({
                        peerId: payload.callerId,
                        peer: peer
                    })

                    setPeers(pre => [...pre, peer])
                })

                socket.current.on('receiving returned signal', payload => {
                    console.log('receiving', payload.signal)

                    const p = peersRef.current.find(p => p.peerId === payload.id)
                    p.peer.signal(payload.signal)
                    p.peer.on('stream', str => {
                        friendVideo.current.srcObject = str
                    })
                })

                socket.current.on('user-disconnected', friendId => {

                    setFriend(null)
                    SetFriendId(null)
                    enqueueSnackbar('Đã có người thoát khỏi phòng', { variant: 'info' })
                })

            });
    }, []);

    const createPeer = (friendId, myId, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socket.current.emit("sending signal", { friendId, myId, signal })
        })
        return peer
    }

    const addPeer = (signalFriend, friendId, stream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socket.current.emit("returning signal", { signal, friendId })
        })

        peer.signal(signalFriend);
        return peer;
    }

    return (
        <Container>
            <Box fullWidth display='flex' flexWrap='wrap' sx={{ border: '2px solid var(--clr-line)' }}>
                <Box flex={7}>
                    <video className={classes.video} ref={friendVideo} autoPlay playsInline />
                </Box>
                <Box flex={3}>
                    <video className={classes.video} muted ref={myVideo} autoPlay playsInline />

                    <Box sx={{ p: 3 }}>
                        <Box>
                            <Typography>Mã phòng: {codeRoom}</Typography>

                        </Box>
                        <hr />
                        <Typography>Trong phòng :</Typography>
                        {!friend && (
                            <Typography color='red'>Không có ai ở đây</Typography>
                        )}

                        {friend && (
                            <Typography color='green'>{`${friend?.name?.firstName || ''} ${friend?.name?.lastName || ''} (${friend?.email})`}</Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container >
    );
}

export default Room;