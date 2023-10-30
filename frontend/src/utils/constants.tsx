import ANDORA from '../../public/assets/image/andorra.svg'
import UK from '../../public/assets/image/uk.svg'
import AUSTRIA from '../../public/assets/image/austria.svg'
import IND from '../../public/assets/image/india.svg'
import HOME from '../../public/assets/image/home.svg'
import CARDS from '../../public/assets/image/creditCard.svg'
import PEOPLE from '../../public/assets/image/person3.svg'
import TEAM from '../../public/assets/image/team.svg'
import ACCOUNT from '../../public/assets/image/new-user.svg'
import GIFT from '../../public/assets/image/gift.svg'
import PersonImg from '../../public/assets/image/person2.svg'
import SettingsImg from '../../public/assets/image/settings.svg'
import QuestionMarkImg from '../../public/assets/image/questionMark.svg'
import LogoutImg from '../../public/assets/image/logout.svg'
import transferType from '../../public/assets/image/transfertype.svg'
import bank from '../../public/assets/image/bank.svg'
import theme from './themes/theme'
import { PaymentCardProps } from '../components/molecules/PaymentCard'
import SBI from '../../public/assets/image/sbi.svg'
import HDFC from '../../public/assets/image/hdfc.svg'
import HSBC from '../../public/assets/image/hsbc.svg'
import AXIS from '../../public/assets/image/axis.svg'
import LLOYD from '../../public/assets/image/horse.svg'
import BANK from '../../public/assets/image/new-bank.svg'
import ARROWRIGHT from '../../public/assets/image/chevronright.svg'
import FLAG from '../../public/assets/image/flag.svg'
import DIVIDER from '../../public/assets/image/divider.svg'
import LOGO from '../../public/assets/image/Lloydsbank.svg'
import LOCK from '../../public/assets/image/lock.svg'
import dayjs, { Dayjs } from 'dayjs'
import SENDICON from '../../public/assets/image/send.svg'
import SETUPICON from '../../public/assets/image/setup.svg'
import PLUS from '../../public/assets/image/plus-new.svg'
import USD from '../../public/assets/image/usd.svg'

export const CANCEL = 'Cancel'
export const SAVE = 'Save'
export const I_KNOW_BANK_DETAILS = 'I know their bank details'
export const REMEMBER_ME = 'Remember me'
export const LLOYDS_BANK_ALT = 'Lloyds bank Logo'
export const VISA_BANK_ALT = 'visa bank logo'
export const CONFIRM_YOUR_PURCHASE = 'Confirm your purchase'
export const STEP1_IN_CONFIRM_PURCHASE =
  'Step 1: Open and confirm the push notification we sent to your mobile.'
export const STEP2_IN_CONFIRM_PURCHASE =
  'Step 2: Return to this screen and press the button below to finish your purchase.'
export const AC_header = 'What would you like to do today?'
export const DS_label = 'Date of Birth'
export const RECIPEINT_TYPE = 'Who are you sending money to?'
export const RECIPEINT_TYPE_VALUES = [
  {
    id: 1,
    src: './assets/image/suitcase.svg',
    alt: 'my business logo',
    children: 'My Business',
  },
  {
    id: 2,
    src: './assets/image/person.svg',
    alt: 'person logo',
    children: 'Someone else',
  },
  {
    id: 3,
    src: './assets/image/dollar.svg',
    alt: 'dollar logo',
    children: 'Business or Charity',
  },
]
export const GET_ACCOUNT_CARD_VALUES = (
  onSendClick: () => void,
  onSetupClick: () => void,
  isSendActive: boolean,
  isSetupActive: boolean
) => [
  {
    id: 'Send',
    iconSrc: SENDICON,
    iconAlt: 'send logo',
    optionMain: 'Send Money',
    optionBody: 'Pay an international employee, invoice, or expense',
    active: isSendActive,
    onClick: onSendClick,
  },
  {
    id: 'Setup',
    iconSrc: SETUPICON,
    iconAlt: 'setup logo',
    optionMain: 'Finish Account Setup',
    optionBody: 'Get balances in multiple currencies, and take buisness goals',
    active: isSetupActive,
    onClick: onSetupClick,
  },
]
export const EUR_VISA_DEBIT = 'EUR Visa Debit'
export const CVV = 'CVV / CVC'
export const LAST_FOUR_DIGITS = 'Last four digit'
export const EXPIRY_DATE = 'Expiry date'
export const CREDIT_CARD_ALT = 'credit-card'
export const HELPER_TEXT = 'Enter 3 digits'
export const BANK_CARD_VALUES = [
  {
    id: 1,
    BC_header: 'Next, go to your Lloyds`s online banking and make a payment',
    BC_heading: 'Our bank details for payments in GBP',
    BC_subheading:
      'Below are the bank detail for this payment.Please only send the money from an account in your name',
    BC_name: 'Payee name',
    BC_amount: 'Amount to send',
    BC_code: 'UK Sort code',
    BC_refernce_number: 'Use this reference',
    BC_account_number: 'Account number',
    BC_address: 'Our bank address',
    BC_footer:
      'You can use your Lloyds online banking or mobile app to make your bank transfer to Wise',
    BC_continue: 'Continue',
    BC_cancel: 'Cancel this transfer',
    BC_iconSrc: './assets/image/Lloydsbank.svg',
    BC_iconAlt: 'Lloyd Bank Icon',
  },
]
export interface CurrencyType {
  icon: string
  code: string
  label: string
  active: boolean
}

export const currencies: CurrencyType[] = [
  { icon: ANDORA, code: 'EUR', label: 'Andora', active: true },
  { icon: UK, code: 'GBP', label: 'United Kingdom', active: true },
  { icon: AUSTRIA, code: 'AUD', label: 'Austria', active: true },
  { icon: IND, code: 'INR', label: 'India', active: true },
]
export const MOBILE_NUMBER_DROPDOWN = [
  {
    id: 1,
    src: ANDORA,
    alt: 'AUD',
    start: '+43',
  },
  {
    id: 2,
    src: UK,
    alt: 'GBP',
    start: '+44',
  },
  {
    id: 3,
    src: IND,
    alt: 'INR',
    start: '+91',
  },
  {
    id: 4,
    src: AUSTRIA,
    alt: 'EUR',
    start: '+376',
  },
]
export const DOWN_ARROW_ALT = 'down-arrow'
export const COUNTRY_ICON_ALT = 'country-img'
export const MOBILE_LABEL = 'Mobile number'
export const CAC_header = 'Confirm trading address'
export const CAC_sub_header =
  'Your trading address is usually the place you work every day. If the business has multiple trading addresses, add as many as possible'
export const CAC_caption = 'Trading addresses'
export const CAC_heading = ' Add Trading addresses'
export const CAC_add_address = 'Add trading address'
export const CAC_cancel = 'Cancel'
export const CAC_save = 'Save'
export const CAC_edit = 'Edit'
export const CAC_confirm = 'Confirm'
export const CAC_add = 'Add'
export interface TradingAddress {
  id: number
  address: string
}
export const tradingAddresses: TradingAddress[] = [
  {
    id: 1,
    address:
      '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
  },
]

export const BUSINESS_SEARCH = [
  { label: 'Zemoso technologies pvt ltd', id: 1 },
  { label: 'Zentech solutions pvt ltd', id: 2 },
  { label: 'ZedX Infotech pvt ltd', id: 3 },
  { label: 'Zeswe Solutions pvt ltd', id: 4 },
  {
    label: "Can't find your business? Enter your details",
    id: 5,
    disabled: true,
  },
]
export const CANT_FIND_BUSINESS = "Can't find your business"
export const ENTER_YOUR_DETAILS = ' Enter your details'
export const SEARCH_FOR_BUSINESS = 'Search for your business'
export const SEARCH_BUSINESS_MESSAGE =
  'Sole trader, freelancer or not registered with Companies house?'
export const SELECT_YOUR_BUSINESS = 'Select your business'
export const ENTER_DETAILS = 'Enter your details'

export const PERSON_AVATAR_ALT = 'Ross Gener Avatar'
export const AVATAR_DROPDOWN_OPTIONS = [
  {
    id: 1,
    src: './assets/image/person2.svg',
    alt: 'personIcon',
    children: 'Your Details',
  },
  {
    id: 2,
    src: './assets/image/settings.svg',
    alt: 'settingsIcon',
    children: 'Settings',
  },
  {
    id: 3,
    src: './assets/image/questionMark.svg',
    alt: 'questionMarkIcon',
    children: 'Help center',
  },
  {
    id: 4,
    src: './assets/image/logout.svg',
    alt: 'logoutIcon',
    children: 'Logout',
  },
]
export const AVATAR_NAME = 'Ross Gener'
export const AVATAR_ID = 'P44561754'
export const COUNTRY_REGISTRATION = 'Your country of registration'
export const CONTINUE = 'Continue'
export const SELECT_YOUR_COUNTRY = 'Select your country'
export { IND }
export { UK }
export { AUSTRIA }
export { ANDORA }
export const AV_HEADING = 'Help us verify your account faster'
export const AV_SUBHEADING =
  'Without this information we can`t verify your account'
export const AV_CONTINUE = 'Continue'
export const AV_LABEL_CATEGORY = 'Category'
export const AV_LABEL_SUBCATEGORY = 'Subcategory'
export const AV_LABEL_SIZE = 'Size of your business'
export const AV_OPTIONS = [
  {
    id: 1,
    label: 'Design, marketing or communication',
    subcategories: [
      { id: 1, label: 'Design' },
      { id: 2, label: 'Marketing' },
      { id: 3, label: 'Communication' },
    ],
  },
  {
    id: 2,
    label: 'Health, sports or personal care',
    subcategories: [
      { id: 1, label: 'Health' },
      { id: 2, label: 'Sports' },
      { id: 3, label: 'Personal care' },
    ],
  },
  {
    id: 3,
    label: 'Real estate or construction',
    subcategories: [
      { id: 1, label: 'Real estate sale, purchase and management' },
      { id: 2, label: 'Real estate construction' },
      { id: 3, label: 'Real estate design and planning' },
    ],
  },
  {
    id: 4,
    label: 'Education or learning',
    subcategories: [
      { id: 1, label: 'Education' },
      { id: 2, label: 'Learning' },
    ],
  },
  {
    id: 5,
    label: 'Others',
    subcategories: [
      { id: 1, label: 'Other category 1' },
      { id: 2, label: 'Other category 2' },
    ],
  },
]
export const AV_SIZE_OPTIONS = [
  {
    id: 1,
    label: '1-50',
  },
  {
    id: 2,
    label: '50-100',
  },
  {
    id: 3,
    label: '100-500',
  },
  {
    id: 4,
    label: '500-1000',
  },

  {
    id: 5,
    label: '1000+',
  },
]
export const UDF_heading = 'Fill in your details'
export const UDF_subheading =
  'Since you`re opening the account, we need to know a bit more about you.'
export const UDF_label_FirstName = 'First Name'
export const UDF_label_LastName = 'Last Name'
export const UDF_label_City = 'City'
export const UDF_label_address = 'Home address'
export const UDF_label_code = 'Postal Code'
export const UDF_label_option = 'Country of residence'
export const UDF_continue = 'Continue'
export const UDF_COUNTRY_OPTIONS = [
  { id: 1, label: 'India' },
  { id: 2, label: 'United Kingdom' },
  { id: 3, label: 'Japan' },
  { id: 4, label: 'China' },
  { id: 5, label: 'France' },
  { id: 6, label: 'United States of America' },
  { id: 7, label: 'Australia' },
]
export const SHARE_TRACKING_LINK = 'Share tracking link'
export const SHARE_LINK_ABOVE =
  'Share the link above, and they can securely track this transfer.'
export const EMAIL = 'Email'
export const SHARE_TRACKING_LINK_VALUES = [
  { id: 1, label: 'Copy', alt: 'link-img' },
  { id: 2, label: 'Email', alt: 'message-img' },
]
export const SHARE_ALT = 'share-img'
export const ENTER_6_DIGIT_CODE = 'Enter the 6-digit code'
export const WE_SENT_IT_TO = 'We sent it to '
export const DIDNT_RECEIVE_CODE = 'I didn’t recieve a code'
export const SUBMIT_BUTTON = 'Submit'
export const ENTER_YOUR_CODE = 'Enter code here'
export const MARIO_GABRIEL = 'Mario Gabriel'
export const SENDING = 'Sending'
export const GBP_100 = '100 GBP'
export const EUR_114 = '114.68 EUR'
export const SEND_TO_SOMEONE = 'Send to someone'
export const I_KNOW_THEIR_BANK = 'I know their bank details'
export const RECEIPIENT_DETAILS = 'Receipient details'
export const ACCOUNT_NUMBER = 'Account number'
export const FIRST_NAME = 'First name'
export const LAST_NAME = 'Last name'
export const IFSC = 'IFSC code'
export const SELECT_ACCOUNT_TYPE = 'Select Account Type'
export const CHECKING = 'Checking'
export const SAVING = 'Saving'
export const APPROVE_ANOTHER_WAY = 'Approve another way'
export const USE_DIFFERENT_PHONE_NUMBER = 'Use a different phone number'
export const RESEND_CODE_BY_SMS = 'Resend code by SMS'
export const SEND_CODE_BY_VOICE = 'Send code by voice call'
export const SP_HEADING = 'What`s the purpose for using PocketPay?'
export const SP_SUBHEADING =
  'To help us keep PocketPay safe and secure, please tell us what you`re using PocketPay for'
export const SP_LABEL_OPTION = 'Tell us what you`re using PocketPay for'
export const SP_OPTIONS = [
  { id: 1, label: 'Paying rent, utilities or property charges' },
  { id: 2, label: 'Paying suppliers/contractors/employees' },
  { id: 3, label: 'Paying for goods or services abroad' },
  { id: 4, label: 'Paying tax on profit or property' },
]

export const WHAT_KIND_OF = 'What kind of account would you like to open today?'
export const YOU_CAN_ADD = 'You can add another account later on, too.'
export const PERSONAL_ACCOUNT = 'Personal account'
export const SEND_SPEND = 'Send, spend, and receive around the world for less.'
export const BUSINESS_ACCOUNT = 'Business account'
export const DO_BUSINESS = 'Do business or freelance work internationally.'
export const CC_HEADING = 'How much would you like to transfer?'
export const CC_AMOUNT = 'Total amount:'
export const CC_FEE = 'Low cost transfer fee:'
export const CC_RATE = 'Guaranteed rate (24 hrs):'
export const CC_LABEL_SEND = 'You send'
export const CC_LABEL_RECEIVE = 'Receipients gets'
export const CC_CONTINUE = 'Continue'
export const CC_MODAL = 'We`ll apply this rate if we receive your money today.'
export const CC_OK = 'OK'
export interface CurrencyConversion {
  id: string
  rates: { [code: string]: number } // Conversion rates from this currency to other currencies
  transferFee: number
}
export const Currency_Conversion_Values: CurrencyConversion[] = [
  {
    id: 'EUR',
    rates: {
      EUR: 1,
      GBP: 0.835, // Conversion rate from EUR to GBP
      AUD: 1.63, // Conversion rate from EUR to AUD
      INR: 90.4, // Conversion rate from EUR to INR
    },
    transferFee: 1.16,
  },
  {
    id: 'GBP',
    rates: {
      GBP: 1,
      EUR: 1.20048, // Conversion rate from GBP to EUR
      AUD: 1.901, // Conversion rate from GBP to AUD
      INR: 105.52, // Conversion rate from GBP to INR
    },
    transferFee: 3.89,
  },
  {
    id: 'AUD',
    rates: {
      AUD: 1,
      EUR: 0.61, // Conversion rate from AUD to EUR
      GBP: 0.52, // Conversion rate from AUD to GBP
      INR: 55.56, // Conversion rate from AUD to INR
    },
    transferFee: 7.38,
  },
  {
    id: 'INR',
    rates: {
      INR: 1,
      EUR: 0.011, // Conversion rate from INR to EUR
      GBP: 0.0094, // Conversion rate from INR to GBP
      AUD: 0.0186, // Conversion rate from INR to AUD
    },
    transferFee: 388.39,
  },
]
export const UPDATES = 'UPDATES'
export const DETAILS = 'DETAILS'
export const GENERAL = 'General'
export const CREATE_YOUR_POCKET = 'Create your PocketPay account'
export const SIGN_UP = ' Sign up'
export const OR_LOG_IN = ' Or,Log in with '
export const BY_REGISTERING = ' By registering, you accept our '
export const TERM_OF_USE = ' Terms of use '
export const AND = 'and'
export const PRIVACY_POLICY = ' Privacy Policy '
export const ALREADY_HAVE = ' Already have an account ? '
export const LOG_IN = ' Log in'
export const ENTER_YOUR_EMAIL = 'Enter your email address'
export const WELCOME_BACK = 'Welcome back'
export const ENTER_YOUR_PASSWORD = 'Enter your password'
export const TROUBLE_LOGGIN_IN = 'Trouble logging in?'
export const CREATE_YOUR_PASSWORD = 'Create your password'
export interface SibebarType {
  id: number
  iconSrc: string
  optionText: string
  disabled: boolean
  heading?: string
}
export const SIDEBAR_VALUES: SibebarType[] = [
  {
    id: 1,
    iconSrc: HOME,
    optionText: 'Home',
    disabled: false,
  },
  {
    id: 2,
    iconSrc: CARDS,
    optionText: 'Cards',
    disabled: true,
  },
  {
    id: 3,
    iconSrc: PEOPLE,
    optionText: 'Recipients',
    disabled: true,
  },
  {
    id: 4,
    iconSrc: TEAM,
    optionText: 'Team',
    disabled: true,
  },
  {
    id: 5,
    iconSrc: ACCOUNT,
    optionText: 'Account',
    disabled: true,
  },
  {
    id: 6,
    iconSrc: GIFT,
    optionText: 'Invite & earn 150 GBP',
    disabled: true,
  },
]
export const SIDEBAR_BALANCE_VALUES: SibebarType[] = [
  {
    id: 1,
    iconSrc: IND,
    optionText: '10,000.00 INR',
    disabled: true,
    heading: 'Balances',
  },
  {
    id: 2,
    iconSrc: AUSTRIA,
    optionText: '1200 GBP',
    disabled: true,
  },
  {
    id: 3,
    iconSrc: USD,
    optionText: '192.00 USD',
    disabled: true,
  },
  {
    id: 4,
    iconSrc: PLUS,
    optionText: 'Open a balance',
    disabled: true,
  },
  {
    id: 5,
    iconSrc: PLUS,
    optionText: 'Open a jar',
    disabled: true,
    heading: 'Jars',
  },
]
export const ROSS_GENER = 'Ross Gener'

export const dropdownValues = [
  {
    id: 1,
    src: PersonImg,
    alt: 'personIcon',
    children: 'Your Details',
  },
  {
    id: 2,
    src: SettingsImg,
    alt: 'settingsIcon',
    children: 'Settings',
  },
  {
    id: 3,
    src: QuestionMarkImg,
    alt: 'questionMarkIcon',
    children: 'Help center',
  },
  {
    id: 4,
    src: LogoutImg,
    alt: 'logoutIcon',
    children: 'Logout',
  },
]
export const CONFIRM_YOUR_BUSINESS_DETAILS = 'Confirm your business details'
export const BUSINESS_DETAILS = 'Business details'
export const BUSINESS_NAME = 'Business name'
export const REGISTRATION_NUMBER = 'Registration number'
export const REGISTERED_ADDRESS = 'Registered address'
export const CONFIRM_BUSINESS_DETAILS_VALUES = [
  {
    registeredNumber: '2021ZEM12345T',
    registeredAddress:
      'MJR Magnifique, 802/803, Khajaguda X Rd, Raidurgam, Prashant Hills, Hyderabad, Rai Durg, Telangana 500008',
  },
  {
    registeredNumber: '2020ZEN5367GJ',
    registeredAddress:
      '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
  },
  {
    registeredNumber: '2020ZED12345I',
    registeredAddress:
      'Near Indian Airlines Colony Begumpet, Hyderabad-500016, Telangana, India',
  },
  {
    registeredNumber: '2020ZES12345I',
    registeredAddress:
      '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
  },
]
export const CONFIRM = 'Confirm'
export const EDIT = 'Edit'

export const CHOOSE_YOUR_TRANSFER_TYPE = 'Choose your transfer type'
export const FAST_AND_EASY_TRANSFER = 'Fast and easy transfer'
export const DEBIT_CARD = 'Debit Card'
export const SEND_FROM_YOUR_VISA = 'Send from your Visa or Mastercard.'
export const SHOULD_ARRIVE_BY = 'Should arrive by January 28th.'
export const CREDIT_CARD = 'Credit Card'
export const LOW_COST_TRANSFER = 'Low cost transfer'
export const TRANSFER_FROM_YOUR_BANK = 'Transfer from your bank account'
export const ADVANCED_TRANSFER = 'Advanced transfer'
export const SWIFT_TRANSFER = 'SWIFT Transfer'
export const SEND_GBP_FROM_YOUR_BANK =
  'Send GBP from your bank account outside the UK.'

export const paymentCardsData: PaymentCardProps[] = [
  {
    icon: transferType,
    cardContent: DEBIT_CARD,
    cardVariant: 'body3',
    primaryContent: SEND_FROM_YOUR_VISA,
    secondaryContent: SHOULD_ARRIVE_BY,
    detailVariant: 'caption',
    flexDirection: 'row',
    color: theme.palette.textColor.mediumEmphasis,
  },
  {
    icon: transferType,
    cardContent: CREDIT_CARD,
    cardVariant: 'body3',
    primaryContent: SEND_FROM_YOUR_VISA,
    secondaryContent: SHOULD_ARRIVE_BY,
    detailVariant: 'caption',
    flexDirection: 'row',
    color: theme.palette.textColor.mediumEmphasis,
    isSelected: false,
  },
  {
    icon: bank,
    cardContent: TRANSFER_FROM_YOUR_BANK,
    cardVariant: 'body3',
    primaryContent: SEND_FROM_YOUR_VISA,
    secondaryContent: SHOULD_ARRIVE_BY,
    detailVariant: 'caption',
    flexDirection: 'row',
    color: theme.palette.textColor.mediumEmphasis,
  },
  {
    icon: transferType,
    cardContent: SWIFT_TRANSFER,
    cardVariant: 'body3',
    primaryContent: SEND_GBP_FROM_YOUR_BANK,
    secondaryContent: SHOULD_ARRIVE_BY,
    detailVariant: 'caption',
    flexDirection: 'row',
    color: theme.palette.textColor.mediumEmphasis,
    isSelected: false,
  },
]
export const CB_HEADER = 'Choose your bank'
export const CB_LABEL_TEXT = 'Start typing to search'
export const CB_CANCEL = 'Cancel the transfer'
export const CB_HEADING = 'Are you sure ?'
export const CB_CONTENT = 'You want to cancel this transfer'
export const CB_YES = 'Yes'
export const CB_NO = 'No'
export interface ChooseBankType {
  id: number
  iconSrc: string
  optionText: string
  arrowSrc: string
  disabled: boolean
}
export const ChooseBank_Values: ChooseBankType[] = [
  {
    id: 1,
    iconSrc: SBI,
    optionText: 'State bank of India',
    arrowSrc: ARROWRIGHT,
    disabled: true,
  },
  {
    id: 2,
    iconSrc: HDFC,
    optionText: 'HDFC',
    arrowSrc: ARROWRIGHT,
    disabled: true,
  },
  {
    id: 3,
    iconSrc: HSBC,
    optionText: 'HSBC',
    arrowSrc: ARROWRIGHT,
    disabled: true,
  },
  {
    id: 4,
    iconSrc: AXIS,
    optionText: 'Axis',
    arrowSrc: ARROWRIGHT,
    disabled: true,
  },
  {
    id: 5,
    iconSrc: LLOYD,
    optionText: 'Lloyds',
    arrowSrc: ARROWRIGHT,
    disabled: false,
  },
  {
    id: 6,
    iconSrc: BANK,
    optionText: 'Other bank',
    arrowSrc: ARROWRIGHT,
    disabled: true,
  },
]
export const SUMMARY_CARD_VALUES = [
  {
    heading: 'Transfer details',
    options: [
      { id: 1, option: 'Fee:', value: '00.00 GBP' },
      { id: 2, option: 'Amount we’ll convert:', value: '77.74 GBP' },
      { id: 3, option: 'Guaranteed rate:', value: '1 GBP = 1.14 EUR' },
    ],
  },
  {
    heading: 'Recipient details',
    options: [
      { id: 1, option: 'Name:', value: 'Mario Gabreil' },
      { id: 2, option: 'Email:', value: 'mario.gabriel@gmail.com' },
      { id: 3, option: 'Account number:', value: '21363738391910' },
      { id: 4, option: 'Account type:', value: 'Checking' },
    ],
  },
]
export const CONTINUE_TO_PAY = 'Continue to pay'
export const CANCEL_THIS_TRANSFER = 'Cancel this transfer'
export const REVIEW_DETAILS_GBP_AMOUNT = '100.00 GBP'
export const REVIEW_DETAILS_EUR_AMOUNT = '114.68 EUR'

export const SAVED_CARD = 'SAVED CARD'
export const NEW_CARD = 'NEW CARD'
export const PD_HEADER = 'Pay from your Lloyds account'
export const PD_CONTENT =
  'You`ll be redirected to Lloyds, where you can securely log in to your own business account and approve the payment for your'
export const PD_HEADING = 'Safe and Secure'
export const PD_POINT_ONE = 'We`ll use an encrypted end to end connection.'
export const PD_POINT_TWO =
  'Your bank will not share your login details with PocketPay or anyone else.'
export const PD_PAY = 'Continue to pay'
export const PD_MANUALLY = 'Pay manually'
export interface PayeeDetailsType {
  id: number
  iconSrc: string
  iconAlt: string
}
export const PayeeDetails_Values: PayeeDetailsType[] = [
  {
    id: 1,
    iconSrc: FLAG,
    iconAlt: 'Flag icon',
  },
  {
    id: 2,
    iconSrc: DIVIDER,
    iconAlt: 'Divider',
  },
  {
    id: 3,
    iconSrc: LOCK,
    iconAlt: 'Lock icon',
  },
  {
    id: 4,
    iconSrc: DIVIDER,
    iconAlt: 'Divider',
  },
  {
    id: 5,
    iconSrc: LOGO,
    iconAlt: 'Lloyd Logo',
  },
]
export const REVIEW_DETAILS_OF_TRANSFER = 'Review details of your transfer'
export const TRANSFER_DETAILS = 'Transfer details'
export const FEE = 'Fee:'
export const AMOUNT_WE_CONVERT = 'Amount we’ll convert:'
export const GUARANTEED_RATE = 'Guranteed rate:'
export const CHANGE = 'Change'
export const NAME = 'Name:'
export const ACCOUNT_TYPE = 'Account type'
export const SCHEDULE_DETAILS = 'Schedule details'
export const SHOULD_ARRIVE = 'Should arrive'
export const REPEATS = 'Repeats'
export const REVIEW_CONFIRM_CHECK =
  'When you press "Confirm you agree with Wise Terms & Conditions"'
export const CONFIRM_AND_CONTINUE = 'Confirm and continue'
export const SCHEDULE_DETAILS_VALUES = [
  { id: 1, option: 'Sending:', value: 'Now' },
  { id: 2, option: 'Should arrive:', value: 'by April 28th' },
  { id: 3, option: 'Repeats:', value: 'Never' },
]
export const AMOUNT = 'Amount'
export const REVIEW_DETAILS_FEE = '00.00 GBP'
export const REVIEW_DETAILS_CONVERSION_AMOUNT = '77.74 GBP'
export const REVIEW_DETAILS_CONVERSION_RATE = '1 GBP = 1.14 EUR'
export const REVIEW_DETAILS_NAME = 'Mario Gabriel'
export const REVIEW_DETAILS_EMAIL = 'mario.gabriel@gmail.com'
export const REVIEW_DETAILS_ACCOUNT_NUMBER = '21363738391910'
export const REVIEW_DETAILS_ACCOUNT_TYPE = 'Checking'

export const SET_UP_BY = 'Set up by:'
export const TRANSFER_NUMBER = 'Transfer number:'
export const ROSS_GENER_YOU = 'Ross Gener (YOU)'
export const TRANSFER_DIGIT = '#3227627272'
export const CANCEL_THE_TRANSFER = 'Cancel the transfer'
export const setupHorizontalStepperValues = [
  'Email',
  'Account type',
  'Country',
  '2-factor-authentication',
  'Password',
]

export const horizontalStepperValues = [
  'Account',
  'You',
  'Recipient',
  'Verification',
  'Review',
  'Pay',
]

export const verticalStepperValues = [
  {
    leftlable: 'Today at 6:43 pm',
    rightlable: 'You set up your transfer',
  },
  {
    leftlable: 'Today at 6:44 pm',
    rightlable: 'We received your GBP',
  },
  {
    leftlable: 'Today at 6:50 pm',
    rightlable: 'Your money’s being processed',
  },
  {
    leftlable: 'Tomorrow at 12:00 am',
    rightlable: 'We pay out your EUR',
  },
  {
    leftlable: 'Tomorrow at 6:00 am',
    rightlable: 'George max recieves your EUR',
  },
]
export const changeToCustomDate = (date: string | null): string => {
  if (date === null) {
    return ''
  }
  const tempDate: Dayjs = dayjs(date)
  return tempDate.format('DD-MM-YYYY')
}

export const POCKET_PAY = 'POCKET PAY'
export const CANCEL_TRANSFER = 'Cancel transfer #3628287220'
export const WHERE_WOULD_YOU_LIKE_TO_REFUND =
  'Where would you like us to refund the money?'
export const SELECT_ACCOUNT = 'Select account'
export const AN_EXISTING_ACCOUNT = 'An existing account'
export const NEW_ACCOUNT = 'New account'
export const SELECT_AN_OPTION = 'Select an option'
export const ACCOUNT_ENDING_WITH_4656 = 'Ending in 4656'
export const ACCOUNT_ENDING_WITH_4242 = 'Ending in 4242'
export const CANCEL_TRANSFER_BUTTON = 'Cancel transfer'
export const ACCOUNT_NUMBER_ENDING_WITH_4242 = 'xxxx xxxx 4242'
export const ACCOUNT_NUMBER_ENDING_WITH_4656 = 'xxxx xxxx 4656'
export const CANCEL_TRANSFER_OPTIONS = [
  {
    id: 1,
    name: ROSS_GENER,
    acctNo: ACCOUNT_ENDING_WITH_4656,
    value: 'option1',
  },
  {
    id: 2,
    name: ROSS_GENER,
    acctNo: ACCOUNT_ENDING_WITH_4242,
    value: 'option2',
  },
]

export const YOUR_MONEY_WILL_BE_REFUNDED = 'Your money will be refunded'
export const REFUND_DESCRIPTION =
  'When we receive your money, we’ll give you a refund. Refunds usually take 3-5 working days.'

export const VERIFY_YOUR_PHONE_NUMBER = 'Verify your phone number with a code'
export const IT_HELPS_US_KEEP = 'It helps us keep your account secure.'
export const PAY_WITH_YOUR_CARD = 'Pay with your card'
export const SEND_ALT = 'Send-Icon'
export const SETUP_ALT = 'Setup-Icon'
export const CONFIRM_YOUR_BUSINESS_DIRECTORS = 'Confirm your business directors'
export const BUSINESS_DIRECTORS_DESCRIPTION =
  'Please confirm these details from companies house. If anyone’s missing, add them below.'
export const CONFIRM_BUSINESS_OWNERS = 'Confirm your business owners'
export const BUSINESS_OWNER_DESCRIPTION =
  'Please confirm these details from companies house. If anyone else controls more than 25% of your business, add them below.'
export const DIRECTOR = 'Director'
export const DIRECTOR_ROLE = 'director'
export const STAKEHOLDER = 'Stakeholder'
export const STAKEHOLDER_ROLE = 'owner'
export const BACK_BUTTON_ALT = 'Back-button-icon'
export const ACCOUNT_NUMBER_VALUE = 729019188810
export const BANK_CARD_CODE = '24-14-70'
export const BANK_CARD_ADDRESS =
  'TransferWise 56 Shoreditch High StreetLondonE16JJ United Kingdom'
export const BANK_CARD_REFERENCE_NO = '#356778810'
export const POCKET_PAY_LOGO_ALT = 'Pocket-pay-logo'
export const ACCOUNT_CARD_VALUES = [
  {
    id: '1',
    iconSrc: SENDICON,
    iconAlt: 'send logo',
    optionMain: 'Send Money',
    optionBody: 'Pay an international employee, invoice, or expense',
  },
  {
    id: '2',
    iconSrc: SETUPICON,
    iconAlt: 'setup logo',
    optionMain: 'Finish Account Setup',
    optionBody: 'Get balances in multiple currencies, and take buisness goals',
  },
]
export const CLOSE_ICON_ALT = 'close-icon'
export const CONFIRM_PURCHASE_AMOUNT = '100.00'
export const GBP = 'GBP'
export const options = ['Your business', 'Business activity', 'Your details']
export const HP_HEADING = 'Home'
export const HP_BUTTON = 'Send money'
export const HP_TEXTLINE_ONE =
  'This is where you’ll see your activity and transactions.'
export const HP_TEXTLINE_TWO = 'Choose how you’d like to get started.'
export const DEMO_DATA = [
  {
    id: 1,
    label: 'Demo Data',
  },
]
export const PAY_BY_CARD = 'Pay with your card'
export interface OwnerDetailType {
  id: number
  first_name: string
  last_name: string
  country_of_residency: string
  dob: string
  type: string
  business_id: number
}
