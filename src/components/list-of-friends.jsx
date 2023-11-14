const getMsgInfo = balance => balance < 0
  ? { message: `Você deve ${Math.abs(balance)} reais`, color: 'red-debit' }
  : balance > 0
    ? { message: `Te deve ${balance} reais`, color: 'green-credit' }
    : { message: 'Estão quites', color: 'white-neutral' }

const ListOfFriends = ({ friends, selectedFriend, onClickFriend }) => (
  <ul>
    {friends.map(friend => {
      const { message, color } = getMsgInfo(friend.balance)
      const isSelectedFriend = friend.id === selectedFriend?.id

      return (
        <li key={friend.id}>
          <img src={friend.img} alt={`Foto de ${friend.name}`} />
          <h3>{friend.name}</h3>
          <p className={color}>{message}</p>
          <button
            onClick={() => onClickFriend(friend)}
            className={`button ${isSelectedFriend ? 'button-close' : ''}`}
          >
            {isSelectedFriend ? 'Fechar' : 'Selecionar'}
          </button>
        </li>
      )
    })}
  </ul>
)

export { ListOfFriends }