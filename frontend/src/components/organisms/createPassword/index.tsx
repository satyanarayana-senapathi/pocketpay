import React, { useState } from 'react'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import CustomTextField from '../../atoms/Textfield'
import PasswordEyeOpen from '../../../../public/assets/image/eyeopen.svg'
import PasswordEyeClose from '../../../../public/assets/image/eyeclosed.svg'
import PasswordEyeOpenLite from '../../../../public/assets/image/eyeOpenLite.svg'
import { Grid, IconButton, InputAdornment } from '@mui/material'
import Icon from '../../atoms/icon'
import styled from '@emotion/styled'
import Button from '../../atoms/button'
import {
  CONTINUE,
  CREATE_YOUR_PASSWORD,
  ENTER_YOUR_PASSWORD,
} from '../../../utils/constants'
import { useData } from '../../../Context/UserContext'
import { evaluatePasswordStrength } from './passwordValidation'

interface CreatePasswordProps {
  height?: string
  width?: string
  onClick?: () => void
}

const StyledTextField = styled(CustomTextField)(() => ({
  height: '60px',
  '& .MuiFormLabel-root': {
    color: theme.palette.textColor.lowEmphasis,
  },
  '@media (min-width: 800px)': {
    width: '516px',
  },
  '@media (max-width: 800px)': {
    width: '100%',
  },
  margin: '0 0 20px',
  borderRadius: '8px',
}))

const StyledButton = styled(Button)(() => ({
  height: '56px',
  '@media (min-width: 800px)': {
    width: '135px',
  },
  '@media (max-width: 800px)': {
    width: '100%',
  },
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:disabled': {
    backgroundColor: theme.palette.primary.primary100,
    color: theme.palette.textColor.contrastText,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
}))

const StyledButtonGrid = styled(Grid)`
  width: 651px;
`

const CreatePassword = ({ height, width, onClick }: CreatePasswordProps) => {
  const { updateData } = useData()
  const [password, setPassword] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(true)
  const [passwordError, setPasswordError] = useState<string>('')

  const handlePassword = () => {
    setPassword((currentState) => !currentState)
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value
    setValue(password)
    updateData({ password })
    setPasswordError(evaluatePasswordStrength(password))
    if (password) {
      setPassword(true)
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  function getParticularIcon() {
    if (password) {
      return PasswordEyeClose
    } else {
      return value.length > 0 ? PasswordEyeOpen : PasswordEyeOpenLite
    }
  }

  const iconComponent = getParticularIcon()

  return (
    <div>
      <Grid width={width} height={height}>
        <Typography
          variant="h1"
          color={theme.palette.textColor.highEmphasis}
          sx={{ marginBottom: '35px' }}
        >
          {CREATE_YOUR_PASSWORD}
        </Typography>
        <StyledTextField
          label={ENTER_YOUR_PASSWORD}
          onChange={handleValueChange}
          type={password ? 'password' : 'text'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handlePassword}
                  data-testid="password-iconbutton"
                >
                  <Icon src={iconComponent} alt="password-icon" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {passwordError && (
          <Typography variant="caption" color={'red'}>
            {passwordError}
          </Typography>
        )}
      </Grid>
      <StyledButtonGrid display="flex" justifyContent="flex-end">
        <StyledButton disabled={disabled} onClick={onClick}>
          <Typography
            variant="body2"
            color={theme.palette.structuralColor.white}
          >
            {CONTINUE}
          </Typography>
        </StyledButton>
      </StyledButtonGrid>
    </div>
  )
}

export default CreatePassword
