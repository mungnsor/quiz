import { Button } from "@/components/ui/button";
import { BookIcon } from "../icons/bookIcon";
import { StarIcon } from "../icons/starIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export const Summary = () => {
  return (
    <div>
      <Card className="w-[856px] h-[366px]">
        <CardHeader>
          <CardTitle className="flex gap-3 items-center font-semibold text-[24px] ">
            <StarIcon />
            Article Quiz Generator
          </CardTitle>
          <CardDescription className="flex gap-3 items-center font-semibold text-[14px] ">
            <BookIcon /> Summarized content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3 font-semibold text-[24px] ">
            Chingis Khann
            <div className="font-normal text-[14px] h-30 ">sumamryryryr</div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className="w-[113px] h-10 border border-gray-200 bg-white rounded-lg flex justify-center items-center text-[14px] text-black hover:bg-white  ">
                  See content
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[728px] min-h-[492px] ">
                <DialogHeader>
                  <DialogTitle>Title</DialogTitle>
                  <DialogDescription>Summaryssssss</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </form>
          </Dialog>
          <Button className="w-[113px] h-10 border border-gray-200 bg-black rounded-lg flex justify-center items-center text-white text-[14px] ">
            Take a quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
