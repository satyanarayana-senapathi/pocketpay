import React from 'react'
import {
  LocalizationProvider,
  DesktopDatePicker as MuiDatePicker,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField, styled } from '@mui/material'
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined'
import { subYears } from 'date-fns'
import theme from '../../../utils/themes/theme'
import { DS_label } from '../../../utils/constants'

export interface DateSelectorProps {
  value: Date | null
  onChange: (value: any) => void
}

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: theme.palette.textColor.lowEmphasis,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
  },
})

const datePropsStyles = {
  '.MuiPickersCalendarHeader-root': {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    color: theme.palette.textColor.mediumEmphasis,
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '21px',
  },
  '.MuiPickersCalendarHeader-root:first-of-type': {
    order: 0,
    paddingRight: '20px',
    paddingLeft: '20px',
  },
  '.MuiPickersArrowSwitcher-root': {
    display: 'inline-flex',
    color: theme.palette.textColor.mediumEmphasis,
  },
  '.MuiPickersCalendarHeader-label': {
    textAlign: 'center',
  },
  '.MuiPickersArrowSwitcher-spacer': {
    width: '220px',
  },
  '.css-31ca4x-MuiPickersFadeTransitionGroup-root': {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  '.css-9reuh9-MuiPickersArrowSwitcher-root': {
    marginLeft: '-2px',
  },
  '.MuiPickersArrowSwitcher-button': {
    paddingRight: '7px',
  },
  '& .MuiDayPicker-weekDayLabel:nth-of-type(1)': {
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.textColor.mediumEmphasis,
    '&::after': {
      content: `"UN"`,
    },
  },
  '& .MuiDayPicker-weekDayLabel:nth-of-type(2)': {
    '&::after': {
      content: `"ON"`,
    },
  },
  '& .MuiDayPicker-weekDayLabel:nth-of-type(3)': {
    '&::after': {
      content: `"UE"`,
    },
  },
  '& .MuiDayPicker-weekDayLabel:nth-of-type(4)': {
    '&::after': {
      content: `"ED"`,
    },
  },
  '& .MuiDayPicker-weekDayLabel:nth-of-type(5)': {
    '&::after': {
      content: `"HU"`,
    },
  },
  '& .MuiDayPicker-weekDayLabel:nth-of-type(6)': {
    '&::after': {
      content: `"RI"`,
    },
  },
  '& .MuiDayPicker-weekDayLabel:nth-of-type(7)': {
    '&::after': {
      content: `"AT"`,
    },
  },
  '& .Mui-selected.css-okjqcy-MuiButtonBase-root-MuiPickersDay-root': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .Mui-selected.css-1q3vjbc-MuiTypography-root-PrivatePickersMonth-root': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .Mui-selected.css-5g6jt1-PrivatePickersYear-button': {
    backgroundColor: theme.palette.primary.main,
  },
}

const DateSelector = (props: DateSelectorProps) => {
  const maxDate = subYears(new Date(), 18)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        disableFuture
        label={DS_label}
        maxDate={maxDate}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            error={false}
            placeholder="dd-MM-yyyy"
            value={props.value || ''}
          />
        )}
        {...props}
        PopperProps={{
          sx: datePropsStyles,
        }}
        components={{
          OpenPickerIcon: CalendarIcon,
        }}
        views={['year', 'month', 'day']}
      />
    </LocalizationProvider>
  )
}

export default DateSelector
