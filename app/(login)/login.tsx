import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Login({ mode }: { mode: 'signIn' | 'signUp' }) {
  return (
    <div className="flex items-center justify-center text-white h-screen">
      <Card className="md:min-w-[450px] min-w-full bg-primaryDark/10 border-primaryDark/50 backdrop-blur-sm">
        <CardHeader className="text-xl font-bold text-center text-white">
          {mode === 'signIn'
            ? 'Sign in to your account'
            : 'Create your account'}
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white font-semibold">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                required
                maxLength={50}
                placeholder="Enter your email"
                className="text-input bg-primaryDark/20 text-white placeholder:text-white/80 border-primaryDark/50 focus-visible:ring-0 focus-visible:ring-primaryDark mt-2 autofill:bg-primaryDark/20"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white font-semibold">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                required
                maxLength={50}
                placeholder="Enter password"
                className="bg-primaryDark/20 text-white placeholder:text-white/80 border-primaryDark/50 focus-visible:ring-0 focus-visible:ring-primaryDark mt-2"
              />
            </div>
            <div>
              <Button type="submit" className="w-full font-bold text-md">
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
