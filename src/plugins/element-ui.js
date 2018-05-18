import {
  Button,
  MessageBox,
  Row,
} from 'element-ui';

export default {
  component: [
    Button,
    MessageBox,
    Row,
  ],
  prototype: {
    $msgbox: MessageBox,
    $alert: MessageBox.alert,
    $confirm: MessageBox.confirm,
    $prompt: MessageBox.prompt
  }
}
