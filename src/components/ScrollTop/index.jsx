import { makeStyles } from "@mui/styles";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    ScrollTop: {
        position: 'fixed',
        bottom: '40px',
        right: '20px',
    }
});

function ScrollTop(props) {
    const classes = useStyles();
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);

        return () => {
            window.removeEventListener('scroll', toggleVisible)
        }
    }, [])

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 250) {
            setVisible(true)
        }
        else if (scrolled <= 250) {
            setVisible(false)
        }
    };
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    }

    return (
        <div className={classes.ScrollTop} style={{ display: visible ? 'inline' : 'none' }} onClick={handleClick}>
            <ArrowCircleUpIcon fontSize="large" color="primary" />
        </div>
    );
}

export default ScrollTop;