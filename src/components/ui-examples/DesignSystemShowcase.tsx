import React from "react";
import designSystem, {
  colors,
  typography,
  spacing,
  borderRadius,
} from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DesignSystemShowcase() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#0030C] to-[#3355E8]">
        Design System
      </h1>

      <Tabs defaultValue="colors">
        <TabsList className="mb-6">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <h2 className="text-2xl font-semibold mb-4">Color Palette</h2>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3">Primary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ColorSwatch
                color={colors.primary.main}
                name="Primary"
                hex="#0030C"
              />
              <ColorSwatch
                color={colors.primary.light}
                name="Primary Light"
                hex="#3355E8"
              />
              <ColorSwatch
                color={colors.primary.dark}
                name="Primary Dark"
                hex="#00208A"
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-3">Neutrals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch
                color={colors.neutral.white}
                name="White"
                hex="#FFFFFF"
                textDark
              />
              <ColorSwatch
                color={colors.neutral.gray400}
                name="Gray"
                hex="#C4C4C4"
                textDark
              />
              <ColorSwatch
                color={colors.neutral.black}
                name="Black"
                hex="#000000"
              />
              <ColorSwatch
                color={colors.neutral.gray200}
                name="Gray 200"
                hex="#E9E9E9"
                textDark
              />
              <ColorSwatch
                color={colors.neutral.gray600}
                name="Gray 600"
                hex="#757575"
              />
              <ColorSwatch
                color={colors.neutral.gray800}
                name="Gray 800"
                hex="#424242"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">Semantic</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch
                color={colors.semantic.success}
                name="Success"
                hex="#4CAF50"
              />
              <ColorSwatch
                color={colors.semantic.warning}
                name="Warning"
                hex="#FFC107"
                textDark
              />
              <ColorSwatch
                color={colors.semantic.error}
                name="Error"
                hex="#F44336"
              />
              <ColorSwatch
                color={colors.semantic.info}
                name="Info"
                hex="#2196F3"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography">
          <h2 className="text-2xl font-semibold mb-6">Typography</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-3">Headings</h3>
              <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg">
                <div>
                  <h1 className="text-5xl font-bold">Heading 1</h1>
                  <p className="text-sm text-gray-500 mt-1">5xl / Bold</p>
                </div>
                <div>
                  <h2 className="text-4xl font-bold">Heading 2</h2>
                  <p className="text-sm text-gray-500 mt-1">4xl / Bold</p>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold">Heading 3</h3>
                  <p className="text-sm text-gray-500 mt-1">3xl / Semibold</p>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold">Heading 4</h4>
                  <p className="text-sm text-gray-500 mt-1">2xl / Semibold</p>
                </div>
                <div>
                  <h5 className="text-xl font-medium">Heading 5</h5>
                  <p className="text-sm text-gray-500 mt-1">xl / Medium</p>
                </div>
                <div>
                  <h6 className="text-lg font-medium">Heading 6</h6>
                  <p className="text-sm text-gray-500 mt-1">lg / Medium</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Body Text</h3>
              <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg">
                <div>
                  <p className="text-base">
                    Body Regular - The quick brown fox jumps over the lazy dog.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">base / Regular</p>
                </div>
                <div>
                  <p className="text-base font-medium">
                    Body Medium - The quick brown fox jumps over the lazy dog.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">base / Medium</p>
                </div>
                <div>
                  <p className="text-sm">
                    Small Text - The quick brown fox jumps over the lazy dog.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">sm / Regular</p>
                </div>
                <div>
                  <p className="text-xs">
                    Extra Small - The quick brown fox jumps over the lazy dog.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">xs / Regular</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="components">
          <h2 className="text-2xl font-semibold mb-6">Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-3">Buttons</h3>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>
                    Disabled Outline
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Cards</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    This is a sample card component with content. Cards can be
                    used to group related information.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Form Elements</h3>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Email" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" placeholder="Password" />
                </div>
                <Button className="mt-2">Submit</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Spacing & Radius</h3>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex flex-wrap gap-4 mb-6">
                  {[2, 4, 6, 8, 12].map((size) => (
                    <div key={size} className="flex flex-col items-center">
                      <div
                        className="bg-[#0030C]"
                        style={{ width: spacing[size], height: spacing[size] }}
                      />
                      <span className="text-xs mt-1">{spacing[size]}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {["sm", "md", "lg", "xl", "full"].map((size) => (
                    <div key={size} className="flex flex-col items-center">
                      <div
                        className="bg-[#0030C] w-16 h-16"
                        style={{ borderRadius: borderRadius[size] }}
                      />
                      <span className="text-xs mt-1">{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="themes">
          <h2 className="text-2xl font-semibold mb-6">Theme Comparison</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-3">Light Theme</h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="text-black text-lg font-semibold mb-3">
                  Sample Content
                </h4>
                <p className="text-gray-800 mb-4">
                  This is how content appears in the light theme with primary
                  accents.
                </p>
                <div className="flex gap-3">
                  <Button style={{ backgroundColor: "#0030C" }}>
                    Primary Action
                  </Button>
                  <Button
                    variant="outline"
                    style={{ borderColor: "#0030C", color: "#0030C" }}
                  >
                    Secondary Action
                  </Button>
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-md border border-gray-300">
                  <p className="text-gray-700">
                    Content in a muted container uses subtle grays for
                    hierarchy.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Dark Theme</h3>
              <div className="bg-black p-6 rounded-lg border border-gray-800">
                <h4 className="text-white text-lg font-semibold mb-3">
                  Sample Content
                </h4>
                <p className="text-gray-300 mb-4">
                  This is how content appears in the dark theme with primary
                  accents.
                </p>
                <div className="flex gap-3">
                  <Button style={{ backgroundColor: "#0030C" }}>
                    Primary Action
                  </Button>
                  <Button
                    variant="outline"
                    style={{
                      borderColor: "#0030C",
                      color: "#0030C",
                      background: "transparent",
                    }}
                  >
                    Secondary Action
                  </Button>
                </div>
                <div className="mt-4 p-4 bg-gray-900 rounded-md border border-gray-700">
                  <p className="text-gray-400">
                    Content in a muted container uses darker grays for
                    hierarchy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-medium mb-3">
              Accessibility Guidelines
            </h3>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Maintain a minimum contrast ratio of 4.5:1 for normal text and
                  3:1 for large text (WCAG AA)
                </li>
                <li>
                  Use semantic HTML elements to improve screen reader
                  compatibility
                </li>
                <li>
                  Ensure interactive elements have a minimum tap target size of
                  44px
                </li>
                <li>Provide visible focus states for keyboard navigation</li>
                <li>
                  Use color as an enhancement, not the only means of conveying
                  information
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
  textDark?: boolean;
}

function ColorSwatch({ color, name, hex, textDark = false }: ColorSwatchProps) {
  return (
    <div className="flex flex-col">
      <div
        className="h-24 rounded-md mb-2"
        style={{ backgroundColor: color }}
      />
      <p className={`font-medium ${textDark ? "text-gray-800" : "text-white"}`}>
        {name}
      </p>
      <p className={`text-sm ${textDark ? "text-gray-600" : "text-gray-300"}`}>
        {hex}
      </p>
    </div>
  );
}
