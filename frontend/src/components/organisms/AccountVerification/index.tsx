import { Box, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import ComboBox, { OptionItem } from '../../atoms/Autocomplete'
import theme from '../../../utils/themes/theme'
import Button from '../../atoms/button'
import {
  AV_HEADING,
  AV_SUBHEADING,
  AV_LABEL_CATEGORY,
  AV_LABEL_SIZE,
  AV_LABEL_SUBCATEGORY,
  AV_CONTINUE,
  AV_OPTIONS,
  AV_SIZE_OPTIONS,
} from '../../../utils/constants'
import React from 'react'
import { useYourDetailData } from '../../../Context/YourDetailContext'

interface AccountVerification {
  selectedCategory: OptionItem | null
  selectedSubcategory: OptionItem | null
  selectedSize: OptionItem | null
}

interface AccountVerificationProps {
  optionDetails: AccountVerification
  handleCont: () => void
}

const MainBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  padding: '5px',
})

const ContainerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '11rem',
})

const OuterBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
})

const TopStyleStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginRight: '7rem',
})

const EndStyleStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem',
})

const ContButton = styled(Button)({
  width: '135px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
})

const AccountVerificationCard = (props: AccountVerificationProps) => {
  const { updateYourDetailData } = useYourDetailData()
  const [optionDetails, setOptionDetails] = React.useState<AccountVerification>(
    props.optionDetails
  )

  React.useEffect(() => {
    setOptionDetails((prevOptionDetails) => ({
      ...prevOptionDetails,
      selectedSubcategory: null,
    }))
  }, [optionDetails.selectedCategory])

  const handleCategoryChange = (option: OptionItem | null) => {
    const category = option?.label
    updateYourDetailData({ category })
    setOptionDetails((prevOptionDetails) => ({
      ...prevOptionDetails,
      selectedCategory: option,
    }))
  }

  const handleSubcategoryChange = (option: OptionItem | null) => {
    const sub_category = option?.label
    updateYourDetailData({ sub_category })
    setOptionDetails((prevOptionDetails) => ({
      ...prevOptionDetails,
      selectedSubcategory: option,
    }))
  }

  const handleSizeChange = (option: OptionItem | null) => {
    const size_of_business = option?.label
    updateYourDetailData({ size_of_business })
    setOptionDetails((prevOptionDetails) => ({
      ...prevOptionDetails,
      selectedSize: option,
    }))
  }

  const getSubcategories = (option: OptionItem) => {
    /* getSubcategories is a function that takes an OptionItem object and returns its subcategories if available; otherwise, it returns an empty array. */ /* istanbul ignore else */
    if (option.subcategories) {
      return option.subcategories
    } else {
      return []
    }
  }

  return (
    <MainBox>
      <ContainerBox>
        <TopStyleStack spacing={'0.75rem'}>
          <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
            {AV_HEADING}
          </Typography>
          <Typography
            variant="body3"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {AV_SUBHEADING}
          </Typography>
        </TopStyleStack>
        <Box>
          <EndStyleStack spacing={'1rem'}>
            <ComboBox
              label={AV_LABEL_CATEGORY}
              value={optionDetails.selectedCategory}
              onChange={handleCategoryChange}
              options={AV_OPTIONS}
            />
            <ComboBox
              label={AV_LABEL_SUBCATEGORY}
              value={optionDetails.selectedSubcategory}
              onChange={handleSubcategoryChange}
              options={
                optionDetails.selectedCategory
                  ? getSubcategories(optionDetails.selectedCategory)
                  : []
              }
            />
            <ComboBox
              label={AV_LABEL_SIZE}
              value={optionDetails.selectedSize}
              onChange={handleSizeChange}
              options={AV_SIZE_OPTIONS}
            />
          </EndStyleStack>
        </Box>
      </ContainerBox>
      <OuterBox>
        <ContButton onClick={props.handleCont}>
          <Typography variant="body2">{AV_CONTINUE}</Typography>
        </ContButton>
      </OuterBox>
    </MainBox>
  )
}

export default AccountVerificationCard
