import { Meta, StoryFn } from '@storybook/react'
import Modal, { ModalProps } from '.'
import Grid from '@mui/material/Grid'
import Typography from '../../atoms/Typography'
import Button from '../../atoms/button'
import theme from '../../../utils/themes/theme'
import { Box } from '@mui/material'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as Meta

const Template: StoryFn<ModalProps> = (args) => <Modal {...args} />

export const SampleModal = Template.bind({})

SampleModal.args = {
  children: (
    <Box sx={{ width: '35.21rem', height: '20.93rem' }}>
      <Grid
        style={{
          marginTop: '3.75rem',
          marginLeft: '2.5rem',
        }}
        item
      >
        <Typography
          variant="body1"
          color={theme.palette.textColor.mediumEmphasis}
        >
          We`ll apply this rate if we receive <br /> your money today.
        </Typography>
      </Grid>
      <Grid
        style={{
          marginTop: '8.5rem',
          marginLeft: '13.1rem',
        }}
        item
      >
        <Button
          variant="contained"
          onClick={action('OK clicked..')}
          style={{
            width: '8.4rem',
            height: '3.4rem',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '1.88rem',
            paddingRight: '1.88rem',
            borderRadius: '3.5rem',
          }}
        >
          <Typography
            variant="body2"
            color={theme.palette.structuralColor.white}
          >
            OK
          </Typography>
        </Button>
      </Grid>
    </Box>
  ),
  isModalOpen: true,
  onClose: action('OnClose clicked..'),
}
