import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form'

function InputField(props) {
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
                // required
                // size='small'

                fullWidth
                label={label} />}
        />
    );
}

export default InputField;

        // <TextField

        //     error={error}
        //     id="filled-error"
        //     label={label}
        //     placeholder={placeholder}
        //     helperText={helperText}
        //     multiline
        //     fullWidth
        // />