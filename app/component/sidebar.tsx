import { SideBarIcon } from "../icons/sideIcon";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarIcon } from "../icons/starIcon";
import { NoteIcon } from "../icons/noteIcon";
export const SideBar = () => {
  return (
    <div className="flex justify-between w-full h-full">
      <div className="w-18 h-242 border border-b-gray-200 flex justify-center items-start py-10 ">
        <SideBarIcon />
      </div>
      <div className="w-full bg-gray-100 flex justify-center items-center ">
        <Card className="w-[856px] h-[442px]">
          <CardHeader>
            <CardTitle className="flex gap-3 items-center">
              {" "}
              <StarIcon />
              Article Quiz Generator
            </CardTitle>
            <CardDescription>
              Paste your article below to generate a summarize and quiz
              question. Your articles will saved in the sidebar for future
              reference.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    {" "}
                    <NoteIcon />
                    Article Title
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter a title for your article..."
                    className="h-10"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    <NoteIcon /> Article Content
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Paste your article content here..."
                    className="h-30"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2 items-end">
            <Button type="submit" className="w-40 h-10">
              Generate summary
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
