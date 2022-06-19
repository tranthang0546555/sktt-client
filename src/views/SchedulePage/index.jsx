import { Box, Step, StepLabel, Stepper, Container, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import ChooseDoctor from './components/ChooseDoctor';
import ChooseTime from './components/ChooseTime';
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import userApi from '../../api/userApi'

const steps = ['Chọn bác sĩ muốn đặt lịch', 'Chọn thời gian phù hợp', 'Xác nhận yêu cầu'];

function Schedule(props) {
    const accessToken = useSelector(state => state.user.current?.accessToken || '')
    const { enqueueSnackbar } = useSnackbar()
    const [activeStep, setActiveStep] = useState(0);

    const [doctorId, setDoctorId] = useState(null)
    const [timeAt, setTimeAt] = useState(null)
    const handleNextStep = async () => {
        if (activeStep === 0) {
            if (!doctorId) enqueueSnackbar('Chưa xong bước 1, vui lòng chọn lại!', { variant: 'error' })
            else {
                enqueueSnackbar('Đã xong bước 1, tiếp tục', { variant: 'success' })
                setActiveStep(pre => pre + 1)
            }
        }
        if (activeStep === 1) {
            if (!timeAt) enqueueSnackbar('Chưa xong bước 2, vui lòng chọn lại!', { variant: 'error' })
            else {
                enqueueSnackbar('Đã xong bước 2, tiếp tục', { variant: 'success' })
                setActiveStep(pre => pre + 1)
            }
        }
        if (activeStep === 2) {
            const data = {
                doctorId: doctorId,
                timeAt: timeAt
            }

            await userApi.scheduling(data, accessToken).then(res => {
                enqueueSnackbar(res.message, { variant: 'info' })
            }).catch(error => { enqueueSnackbar(error.response.data.message, { variant: 'error' }) })

        }

    }
    const handleBackStep = () => {
        if (activeStep === 1) setDoctorId(null)
        if (activeStep === 2) setTimeAt(null)
        setActiveStep(pre => pre - 1)
    }

    const handleResetSteps = () => {
        setActiveStep(0)
    }

    const handleChooseDoctor = (id) => {
        setDoctorId(id)
        console.log("ID", id)
    }

    const handleChooseTime = (from, to) => {
        setTimeAt({ from: from, to: to })
    }

    console.log(timeAt)

    return (
        <Container>
            <Box sx={{ width: '100%', pt: 3 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Đã hoàn thành các bước
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleResetSteps}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Bước {activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                variant='contained'
                                onClick={handleBackStep}
                                color="inherit"
                                disabled={activeStep === 0}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>

                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNextStep} variant='contained'>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
            <Box>
                {(activeStep === 0) && (
                    <ChooseDoctor handleChooseDoctor={handleChooseDoctor} />
                )}
                {(activeStep === 1) && (
                    <ChooseTime handleChooseTime={handleChooseTime} doctorId={doctorId} />
                )}
            </Box>
        </Container>
    );
}

export default Schedule;