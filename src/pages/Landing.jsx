import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Landing = () => {
  return (
    <div>
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br/> you&rsquo;ll ever need! 🚀👇
      </h2>
      <form>
        <Input/>
        <Button>Shorten!</Button>
      </form>
      <img src="/banner.jpeg" alt="banner" className="w-full my-11 md:px-11"/>
    </div>
  )
}

export default Landing
