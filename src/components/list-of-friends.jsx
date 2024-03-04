import { Button } from './shared/button'

const getMsgInfo = balance => balance < 0
  ? { message: `Você deve ${Math.abs(balance)} reais`, color: 'text-red-primary' }
  : balance > 0
    ? { message: `Te deve ${balance} reais`, color: 'text-green-credit' }
    : { message: 'Estão quites', color: 'text-white' }

const ListOfFriends = ({ friends, selectedFriend, onClickFriend }) => (
  <ul className="flex flex-col gap-[.4rem] text-[1.4rem] mb-8">
    {friends.map(friend => {
      const { message, color } = getMsgInfo(friend.balance)
      const isSelectedFriend = friend.id === selectedFriend?.id
      return (
        <li key={friend.id} className="grid grid-cols-[4.8rem_1fr_auto] items-center gap-x-[1.6rem] p-[1.2rem] rounded-[7px] transition-all duration-500 ease-[cubic-bezier(0.25, 0.1, 0.25, 1.0)] delay-0 hover:bg-dark-gray-blue">
          <img src={friend.img} alt={`Foto de ${friend.name}`} className="rounded-[30%] w-full row-[span_2]" />
          <h3 className="font-semibold text-[1.6rem] row-[1] col-[2]">{friend.name}</h3>
          <p className={`${color} row-[2] col-[2]`}>{message}</p>
          <Button onClick={() => onClickFriend(friend)} className={`${isSelectedFriend ? 'bg-red-primary' : ''} row-[span_2] col-[3] float-right bg-light-green`}>
            {isSelectedFriend ? 'Fechar' : 'Selecionar'}
          </Button>
        </li>
      )
    })}
  </ul>
)

export { ListOfFriends }
