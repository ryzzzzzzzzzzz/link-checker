import UseFetchPost from './UseFetchPost'

const Hooks = (props) => {
    return(
        <div>
            <UseFetchPost state={props.state} getToken={props.getToken}/>
        </div>
    )
}

export default Hooks;