import { Link } from "react-router-dom";

export default function Error() {
  return (
    <h1 className="error">Oops. Seems like you're lost. Go back <Link to="/">home</Link></h1>
  )
}
