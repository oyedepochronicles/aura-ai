import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, CreditCard, Sun, Moon, Bell, Shield, KeyRound, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const navigate = useNavigate();

  const switchTheme = (t: "dark" | "light") => {
    setTheme(t);
    document.documentElement.classList.toggle("light", t === "light");
    toast.success(`${t === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
          <div>
            <h1 className="font-display text-4xl font-light">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your workspace, profile, and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="glass rounded-xl p-1 h-auto flex-wrap">
              <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-flow/15 data-[state=active]:text-flow"><User className="size-4 mr-2" /> Profile</TabsTrigger>
              <TabsTrigger value="appearance" className="rounded-lg data-[state=active]:bg-flow/15 data-[state=active]:text-flow"><Sun className="size-4 mr-2" /> Appearance</TabsTrigger>
              <TabsTrigger value="api" className="rounded-lg data-[state=active]:bg-flow/15 data-[state=active]:text-flow"><KeyRound className="size-4 mr-2" /> API</TabsTrigger>
              <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-flow/15 data-[state=active]:text-flow"><Shield className="size-4 mr-2" /> Security</TabsTrigger>
              <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-flow/15 data-[state=active]:text-flow"><Bell className="size-4 mr-2" /> Notifications</TabsTrigger>
              <TabsTrigger value="billing" className="rounded-lg data-[state=active]:bg-flow/15 data-[state=active]:text-flow"><CreditCard className="size-4 mr-2" /> Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="glass rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-2xl bg-gradient-flow flex items-center justify-center text-void font-display text-2xl font-semibold">ET</div>
                <div>
                  <h3 className="font-display text-xl">Elias Thorne</h3>
                  <p className="text-sm text-muted-foreground">elias@workspace.com</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <Input defaultValue="Elias Thorne" className="rounded-xl bg-muted/40 border-border/60" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="elias@workspace.com" className="rounded-xl bg-muted/40 border-border/60" />
                </div>
              </div>
              <Button onClick={() => toast.success("Profile saved")} className="rounded-xl bg-gradient-flow text-void font-semibold">Save changes</Button>
            </TabsContent>

            <TabsContent value="appearance" className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-xl">Theme</h3>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  onClick={() => switchTheme("dark")}
                  className={`p-4 rounded-2xl border transition-all ${theme === "dark" ? "border-flow bg-flow/10" : "border-border/60 hover:border-flow/30"}`}
                >
                  <Moon className="size-5 mb-2 text-flow" />
                  <p className="text-sm font-medium text-left">Dark</p>
                </button>
                <button
                  onClick={() => switchTheme("light")}
                  className={`p-4 rounded-2xl border transition-all ${theme === "light" ? "border-flow bg-flow/10" : "border-border/60 hover:border-flow/30"}`}
                >
                  <Sun className="size-5 mb-2 text-flow" />
                  <p className="text-sm font-medium text-left">Light</p>
                </button>
              </div>
            </TabsContent>

            <TabsContent value="api" className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-xl">API access</h3>
              <p className="text-sm text-muted-foreground">Use your secret API key to integrate Fluere with your stack.</p>
              <div className="flex gap-2">
                <Input readOnly value="sk_fluere_••••••••••••3a7f" className="rounded-xl bg-muted/40 border-border/60 font-mono text-xs" />
                <Button variant="outline" onClick={() => toast.success("Key copied")} className="rounded-xl">Copy</Button>
              </div>
              <Button variant="outline" className="rounded-xl">Regenerate key</Button>
            </TabsContent>

            <TabsContent value="security" className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-xl">Security</h3>
              <div className="flex items-center justify-between py-2">
                <div><p className="font-medium">Two-factor authentication</p><p className="text-sm text-muted-foreground">Add an extra layer of security</p></div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-2">
                <div><p className="font-medium">Session expiry</p><p className="text-sm text-muted-foreground">Sign out idle sessions after 30 days</p></div>
                <Switch defaultChecked />
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-xl">Notifications</h3>
              {["Document upload complete", "Weekly synthesis report", "Product updates", "Security alerts"].map((n, i) => (
                <div key={n} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <p className="text-sm">{n}</p>
                  <Switch defaultChecked={i < 2} />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="billing" className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-xl">Subscription</h3>
              <div className="p-5 rounded-2xl bg-gradient-flow/10 border border-flow/30">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-display text-2xl text-flow">Premium</p>
                    <p className="text-sm text-muted-foreground">Unlimited queries · 20GB storage</p>
                  </div>
                  <p className="font-display text-2xl">$24<span className="text-sm text-muted-foreground">/mo</span></p>
                </div>
              </div>
              <Button variant="outline" className="rounded-xl">Manage subscription</Button>
            </TabsContent>
          </Tabs>

          <div className="glass rounded-2xl p-6 flex justify-between items-center">
            <div>
              <p className="font-display text-lg">Sign out</p>
              <p className="text-sm text-muted-foreground">End your session on this device</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/login")} className="rounded-xl text-destructive border-destructive/40 hover:bg-destructive/10">
              <LogOut className="size-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
