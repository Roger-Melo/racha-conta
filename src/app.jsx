import { useState } from 'react'
import { Logo } from './components/logo'
import { ButtonAddFriend } from './components/button-add-friend'
import { FormAddFriend } from './components/form-add-friend'
import { FormSplitBill } from './components/form-split-bill'
import { ListOfFriends } from './components/list-of-friends'

const initialFriends = [
  { id: crypto.randomUUID(), name: 'André', balance: -7, img: 'friends/andre-48.jpg' },
  { id: crypto.randomUUID(), name: 'Pri', balance: 20, img: 'friends/pri-48.jpg' },
  { id: crypto.randomUUID(), name: 'Dú', balance: 0, img: 'friends/du-48.jpg' }
]

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
          {showFormAddFriend && <FormAddFriend onSubmitAddFriend={handleSubmitAddFriend} />}
          <ButtonAddFriend
            showFormAddFriend={showFormAddFriend}
            onClickAddFriend={handleClickAddFriend}
          />
        </aside>
        {selectedFriend && <FormSplitBill
          selectedFriend={selectedFriend}
          onSubmitShareBill={handleSubmitShareBill}
        />}
      </main>
    </>
  )
}

export { App }
