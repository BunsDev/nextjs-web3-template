import { useAccount, useSignMessage } from 'wagmi'

function SignButton() {
  const { signMessage } = useSignMessage()
  const { address } = useAccount()

  return <button onClick={() => signMessage({ message: 'hello world', account: address })}>Sign message</button>
}

export default SignButton