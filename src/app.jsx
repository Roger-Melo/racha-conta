import { useReducer } from 'react'
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

const reducer = (state, action) => ({
  submitted_share_bill: { ...state, selectedFriend: null, friends: state.friends.map(p => action.friend?.id === p.id ? action.friend : p) },
  selected_friend: { ...state, selectedFriend: state.selectedFriend?.id === action.friend?.id ? null : action.friend },
  submitted_new_friend: { ...state, showFormAddFriend: false, friends: [...state.friends, action.newFriend] },
  clicked_to_add_new_friend: { ...state, showFormAddFriend: !state.showFormAddFriend }
})[action.type] || state

const initialState = { friends: initialFriends, selectedFriend: null, showFormAddFriend: false }

const App = () => {
  const [{ friends, selectedFriend, showFormAddFriend }, dispatch] = useReducer(reducer, initialState)
  const handleClickAddFriend = () => dispatch({ type: 'clicked_to_add_new_friend' })
  const handleClickFriend = friend => dispatch({ type: 'selected_friend', friend })
  const handleSubmitShareBill = friend => dispatch({ type: 'submitted_share_bill', friend })
  const handleSubmitAddFriend = newFriend => dispatch({ type: 'submitted_new_friend', newFriend })
  return (
    <>
      <Logo />
      <main className="min-h-[66vh] grid grid-cols-[34rem_44rem] gap-x-16 items-start">
        <aside className="flex flex-col">
          <ListOfFriends friends={friends} selectedFriend={selectedFriend} onClickFriend={handleClickFriend} />
          {showFormAddFriend && <FormAddFriend onSubmitAddFriend={handleSubmitAddFriend} />}
          <ButtonAddFriend showFormAddFriend={showFormAddFriend} onClickAddFriend={handleClickAddFriend} />
        </aside>
        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSubmitShareBill={handleSubmitShareBill} />}
      </main>
    </>
  )
}

export { App }
