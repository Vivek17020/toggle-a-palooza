import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-8">
      <div className="bg-card rounded-3xl shadow-2xl p-12 max-w-md w-full border border-border/50 backdrop-blur-sm">
        <div className="text-center space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Toggle Switch
            </h1>
            <p className="text-muted-foreground text-lg">
              A beautiful, simple toggle button
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-4 py-8">
            <Label 
              htmlFor="main-toggle" 
              className={`text-lg font-medium transition-colors duration-300 ${
                isToggled ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {isToggled ? 'ON' : 'OFF'}
            </Label>
            <Switch
              id="main-toggle"
              checked={isToggled}
              onCheckedChange={setIsToggled}
              className="data-[state=checked]:bg-toggle-bg-checked data-[state=unchecked]:bg-toggle-bg shadow-toggle focus-visible:shadow-toggle-focus scale-150"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Status: <span className={`font-semibold ${isToggled ? 'text-primary' : 'text-foreground'}`}>
                {isToggled ? 'Enabled' : 'Disabled'}
              </span>
            </p>
            <div className={`h-2 rounded-full transition-all duration-500 ${
              isToggled 
                ? 'bg-gradient-primary shadow-lg shadow-primary/25' 
                : 'bg-muted'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;