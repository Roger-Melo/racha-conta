import { useState } from 'react'

const initialFriends = [
  { id: crypto.randomUUID(), name: 'André', balance: -7, img: 'friends/andre-48.jpg' },
  { id: crypto.randomUUID(), name: 'Pri', balance: 20, img: 'friends/pri-48.jpg' },
  { id: crypto.randomUUID(), name: 'Dú', balance: 0, img: 'friends/du-48.jpg' }
]

const getMsgInfo = balance => balance < 0
  ? { message: `Você deve ${Math.abs(balance)} reais`, color: 'red-debit' }
  : balance > 0
    ? { message: `Te deve ${balance} reais`, color: 'green-credit' }
    : { message: 'Estão quites', color: 'white-neutral' }

const Logo = () => (
  <header className='header'>
    <img src="logo-racha-conta.png" alt="Racha-conta" />
  </header>
)

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

const FormAddFriend = ({ showFormAddFriend, onSubmitAddFriend }) => {
  const [nameOfFriend, setNameOfFriend] = useState('')
  const [imgOfFriend, setImgOfFriend] = useState('')

  const handleChangeNameOfFriend = e => setNameOfFriend(e.target.value)
  const handleChangeImgOfFriend = e => setImgOfFriend(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    const newFriend = { id: crypto.randomUUID(), name: nameOfFriend, balance: 0, img: imgOfFriend }

    onSubmitAddFriend(newFriend)
    setNameOfFriend('')
    setImgOfFriend('')
  }

  return showFormAddFriend &&
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>
        🧍🏻‍♂️ Nome
        <input value={nameOfFriend} onChange={handleChangeNameOfFriend} />
      </label>
      <label>
        📷 Foto
        <input value={imgOfFriend} onChange={handleChangeImgOfFriend} />
      </label>
      <button className="button">Adicionar</button>
    </form>
}

const ButtonAddFriend = ({ showFormAddFriend, onClickAddFriend }) => (
  <button
    onClick={onClickAddFriend}
    className={`button ${showFormAddFriend ? 'button-close' : ''}`}
  >
    {showFormAddFriend ? 'Fechar' : 'Adicionar amigo(a)'}
  </button>
)

const FormSplitBill = ({ selectedFriend, onSubmitShareBill }) => {
  const [totalBill, setTotalBill] = useState('')
  const [mySpend, setMySpend] = useState('')
  const [whoWillPay, setWhoWillPay] = useState('you')

  const handleChangeBill = e => setTotalBill(e.target.value)
  const handleChangeMySpend = e => setMySpend(e.target.value)
  const handleChangeWhoWillPay = e => setWhoWillPay(e.target.value)

  const handleSubmitShareBill = e => {
    e.preventDefault()
    onSubmitShareBill({
      ...selectedFriend,
      balance: whoWillPay === 'you'
        ? selectedFriend.balance + (+totalBill - +mySpend)
        : selectedFriend.balance - +mySpend
    })

    setTotalBill('')
    setMySpend('')
    setWhoWillPay('you')
  }

  return selectedFriend &&
    <form onSubmit={handleSubmitShareBill} className="form-split-bill">
      <h2>Rache a conta com {selectedFriend.name}</h2>
      <label>
        💰 Valor total
        <input value={totalBill} onChange={handleChangeBill} type="number" />
      </label>
      <label>
        🤸🏻‍♂️ Seus gastos
        <input value={mySpend} onChange={handleChangeMySpend} type="number" />
      </label>
      <label>
        🤑 Quem vai pagar
        <select value={whoWillPay} onChange={handleChangeWhoWillPay}>
          <option value='you'>Você</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
      </label>
      <button className="button">Rachar conta</button>
    </form>
}

const App = () => {
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [showFormAddFriend, setShowFormAddFriend] = useState(false)

  const handleClickAddFriend = () => setShowFormAddFriend(b => !b)
  const handleClickFriend = friend => setSelectedFriend(p => p?.id === friend.id ? null : friend)

  const handleSubmitShareBill = friend => {
    setFriends(prev => prev.map(p => friend.id === p.id ? friend : p))
    setSelectedFriend(null)
  }

  const handleSubmitAddFriend = newFriend => {
    setFriends(prev => [...prev, newFriend])
    setShowFormAddFriend(false)
  }

  return (
    <>
      <Logo />
      <main className="app">
        <aside className="sidebar">
          <ListOfFriends
            friends={friends}
            selectedFriend={selectedFriend}
            onClickFriend={handleClickFriend}
          />
          <FormAddFriend
            showFormAddFriend={showFormAddFriend}
            onSubmitAddFriend={handleSubmitAddFriend}
          />
          <ButtonAddFriend
            showFormAddFriend={showFormAddFriend}
            onClickAddFriend={handleClickAddFriend}
          />
        </aside>
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSubmitShareBill={handleSubmitShareBill}
        />
      </main>
    </>
  )
}

export { App }
