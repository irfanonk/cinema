
import React, {useState} from 'react'
import ReactDOM from 'react-dom';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

const UserProfileSidebar = (props) => {
  const [visible, setVisible] = useState('visible')

  return ReactDOM.createPortal (
    <Sidebar.Pushable >
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'
      >
        <Menu.Item as='a'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Games
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
          Channels
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
          <Header as='h3'>Application Content</Header>
          <Image src='/images/wireframe/paragraph.png' />
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>,
    document.querySelector('#sidebar')
  )
}

export default UserProfileSidebar
