import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form'

function PasswordFiled(props) {
    const { control, name, label, errors } = props
    const hasError = (!!errors[name])

    return (
        <Controller
            name={name}
            control={control}

            render={({ field }) => <TextField {...field}
                error={hasError}
                helperText={errors[name]?.message}
                margin='dense'
                type="password"
                autoComplete="current-password"

                fullWidth
                label={label} />}
        />
    );
}

export default PasswordFiled;
