import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

function SignUp({setClose} : {setClose : (a : boolean)=> void}) {
  return (
    <Card className="w-full shrink-0 rounded-none">
      <CardHeader>
        <div className="flex justify-between items-center text-xl flex-row-reverse">
          <CardTitle>Create an account</CardTitle>
          <Button variant="link" className="cursor-pointer p-0"  onClick={()=>setClose(false)}>
           
              <ArrowLeft width={20} className="mr-2" />
              Sign Up
            
          </Button>
        </div>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Create Account
        </Button>
        <Button variant="outline" className="w-full">
          Sign up with Google
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SignUp