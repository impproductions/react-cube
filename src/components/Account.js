import { useState } from "react";

function Account() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        !loggedIn ?
            (<article>
                <h1>
                    Log In
                </h1>
                <p>
                    Feel free to write stuff in these fields and then click on the "Submit" button. Nothing will happen, but it's a way to pass time.
                </p>
                <div className='inset'>
                    <form action="">
                        <label htmlFor="username-field">Username</label>
                        <input type="text" placeholder='Username' />
                        <label htmlFor="password-field">Password</label>
                        <input type="password" placeholder='Password' />
                        <button type='submit' onClick={() => setLoggedIn(true)}>Submit</button>
                    </form>
                </div>
            </article>)
            :
            (<article>
                <h1>
                    Account
                </h1>
                <p>
                    Psych! There actually is a dummy account management page, for your enjoyment.
                </p>
                <form>
                    <button type='button' onClick={() => setLoggedIn(false)}>Log out</button>
                </form>
            </article>)
    );
}

export default Account;