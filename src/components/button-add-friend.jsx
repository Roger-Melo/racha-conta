import { Button } from './shared/button'

const ButtonAddFriend = ({ showFormAddFriend, onClickAddFriend }) => (
  <Button onClick={onClickAddFriend} className={`${showFormAddFriend ? 'bg-red-primary' : 'bg-light-green'}`}>
    {showFormAddFriend ? 'Fechar' : 'Adicionar amigo(a)'}
  </Button>
)

export { ButtonAddFriend }
