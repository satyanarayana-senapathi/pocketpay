import React, { useState } from 'react'
import Modal from '../../molecules/Modal'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import {
  SHARE_ALT,
  SHARE_LINK_ABOVE,
  SHARE_TRACKING_LINK,
  SHARE_TRACKING_LINK_VALUES,
} from '../../../utils/constants'
import Image from '../../atoms/image'
import ShareTrackingLink from '../../../../public/assets/image/shareLink.svg'
import MessageImg from '../../../../public/assets/image/message.svg'
import LinkImg from '../../../../public/assets/image/link.svg'
import { Box, IconButton, Stack } from '@mui/material'
import Icon from '../../atoms/icon'
import styled from '@emotion/styled'
import ShareImg from '../../../../public/assets/image/share.svg'

const StyledStack = styled(Stack)`
  height: 462px;
  padding: 0;
  box-sizing: border-box;
`

const CircularBox = styled(Box)`
  border: 1px solid ${theme.palette.primary.primary500};
  border-radius: 50%;
  height: 60px;
  width: 60px;
  box-sizing: border-box;
  margin-bottom: 10px;
`

const StyledInnerStack = styled(Stack)`
  margin: 40px 0;
  width: 160px;
  height: 96px;
  box-sizing: border-box;
`

const ShareTrackingModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleModal = () => {
    setModalOpen((currentState) => !currentState)
  }

  return (
    <div>
      <Modal isModalOpen={modalOpen} onClose={handleModal}>
        <StyledStack display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="body1"
            color={theme.palette.textColor.highEmphasis}
            sx={{ margin: '30px 0 40px' }}
          >
            {SHARE_TRACKING_LINK}
          </Typography>
          <Image
            source={ShareTrackingLink}
            alt="share"
            style={{ width: '175px', height: '126px' }}
          />
          <StyledInnerStack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            {SHARE_TRACKING_LINK_VALUES.map((item) => {
              return (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  key={item.id}
                >
                  <CircularBox
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon
                      src={item.id === 1 ? MessageImg : LinkImg}
                      alt={item.alt}
                    />
                  </CircularBox>
                  <Typography
                    color={theme.palette.primary.primary500}
                    variant="body3"
                  >
                    {item.label}
                  </Typography>
                </Stack>
              )
            })}
          </StyledInnerStack>
          <Typography
            variant="body3"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {SHARE_LINK_ABOVE}
          </Typography>
        </StyledStack>
      </Modal>
      <IconButton onClick={handleModal} data-testid="modal-open-button">
        <Icon src={ShareImg} alt={SHARE_ALT} />
      </IconButton>
    </div>
  )
}

export default ShareTrackingModal
