import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import SearchIcon from '@mui/icons-material/Search'
import {
  SEARCH_FOR_BUSINESS,
  SEARCH_BUSINESS_MESSAGE,
  BUSINESS_SEARCH,
  CANT_FIND_BUSINESS,
  ENTER_YOUR_DETAILS,
  SELECT_YOUR_BUSINESS,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import { IconButton } from '@mui/material'
import styled from '@emotion/styled'
import './index.css'

interface Option {
  label: string
  id: number
  disabled?: boolean
}

const StyledStack = styled(Stack)`
  height: 60px;

  @media (min-width: 800px) {
    width: 516px;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`

interface BusinessSearchProps {
  onClick: () => void
}

const BusinessSearch = ({ onClick }: BusinessSearchProps) => {
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(
    null
  )

  const handleSelectOption = (
    event: React.ChangeEvent<unknown>,
    newValue: Option | null
  ) => {
    if (!newValue || newValue.disabled) {
      return
    }
    setSelectedOption(newValue)
    onClick()
  }

  return (
    <div>
      <Typography variant="h1" color="textPrimary">
        {SEARCH_FOR_BUSINESS}
      </Typography>
      <Stack margin="10px 0 40px">
        <Typography
          variant="body3"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {SEARCH_BUSINESS_MESSAGE}
        </Typography>
      </Stack>
      <StyledStack>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={BUSINESS_SEARCH}
          data-testid="auto-complete"
          autoComplete={false}
          value={selectedOption}
          onChange={handleSelectOption}
          renderInput={(params) => (
            <TextField
              {...params}
              label={SELECT_YOUR_BUSINESS}
              data-testid="business-textfield"
              InputProps={{
                ...params.InputProps,
                className: 'styledTextField',
                endAdornment: (
                  <React.Fragment>
                    <IconButton data-testid="search-click-button">
                      <SearchIcon
                        className="searchIcon"
                        data-testid="search-icon"
                      />
                    </IconButton>
                  </React.Fragment>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            const label = option.label
            const parts = label.split('?')
            const isBlue = parts[0] === CANT_FIND_BUSINESS
            const isPurple = parts[1] === ENTER_YOUR_DETAILS

            return (
              <li
                {...props}
                style={{ cursor: option.disabled ? 'not-allowed' : 'pointer' }}
                data-testid="business-options"
              >
                <Stack display="flex" flexDirection="row">
                  <Typography
                    variant="body1"
                    style={{
                      color: isBlue
                        ? theme.palette.textColor.mediumEmphasis
                        : 'black',
                    }}
                  >
                    {isBlue ? `${parts[0]}?` : `${parts[0]}`}
                  </Typography>
                  {isPurple && (
                    <Typography
                      variant="body1"
                      color={theme.palette.primary.primary500}
                    >
                      {` ${parts[1]}`}
                    </Typography>
                  )}
                </Stack>
              </li>
            )
          }}
        />
      </StyledStack>
    </div>
  )
}

export default BusinessSearch
