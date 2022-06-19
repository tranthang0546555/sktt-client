import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useSnackbar } from 'notistack'
function ReceiveEmail(props) {
    const { enqueueSnackbar } = useSnackbar()
    const onSubmit = (e) => {
        enqueueSnackbar('Đã gửi yêu cầu', { variant: 'success' })
    }

    return (
        <Container sx={{ minHeight: '500px' }}>
            <Box sx={{ p: 3 }} textAlign='center'>
                <form onSubmit={onSubmit}>
                    <Typography variant='h6'>Gửi câu hỏi của bạn tại đây</Typography>
                    <Box display='flex'>
                        <Box flex={1} sx={{ p: 2 }}>
                            <TextField fullWidth id="outlined-basic" label="Địa chỉ Email" variant="outlined" />
                        </Box>
                        <Box flex={1} sx={{ p: 2 }}>
                            <TextField fullWidth id="outlined-basic" label="Số điện thoại" variant="outlined" />
                        </Box>
                    </Box>
                    <Box display='flex' sx={{ p: 2 }}>
                        <TextField fullWidth id="outlined-basic" label="Tiêu đề" variant="outlined" />
                    </Box>
                    <Box display='flex' sx={{ p: 2 }}>
                        <TextField fullWidth id="outlined-basic" label="Nội dung" variant="outlined" multiline rows={4} />
                    </Box>
                    <Box display='flex' sx={{ pl: 2, pr: 2 }}>
                        <Button type='submit' variant='contained' fullWidth>Gửi đi</Button>
                    </Box>
                </form>

            </Box>
        </Container>
    );
}

export default ReceiveEmail;