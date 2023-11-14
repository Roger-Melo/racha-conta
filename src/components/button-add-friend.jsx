const ButtonAddFriend = ({ showFormAddFriend, onClickAddFriend }) => (
  <button
    onClick={onClickAddFriend}
    className={`button ${showFormAddFriend ? 'button-close' : ''}`}
  >
    {showFormAddFriend ? 'Fechar' : 'Adicionar amigo(a)'}
  </button>
)

export { ButtonAddFriend }