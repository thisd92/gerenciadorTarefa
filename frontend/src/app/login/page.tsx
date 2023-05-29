export default function Login() {
    return (
        <>
            <main className="justify-center p-2 w">
                <div>
                    <header>Welcome!</header>
                </div>
                <div className="flex flex-col w-48">
                    <form action="">
                        <div className="form-control flex flex-col">
                            <label htmlFor="">Username or e-mail:</label>
                            <input type="text" name="username" id="" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label htmlFor="">Password</label>
                            <input type="password" name="password" id="" />
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}