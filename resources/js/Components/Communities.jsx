import { Avatar } from "./Avatar"

export const Communities = () =>{

    return(
        <div>
             <aside className="hidden lg:block lg:w-64 p-4 bg-[#1A1A1B]">
          <h2 className="font-bold mb-4">Popular Communities</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Avatar>EL</Avatar>
              <div>
                <p className="font-medium">r/explainlikeimfive</p>
                <p className="text-sm text-gray-400">22,547,892 members</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar>AM</Avatar>
              <div>
                <p className="font-medium">r/AMA</p>
                <p className="text-sm text-gray-400">22,534,168 members</p>
              </div>
            </div>
          </div>
        </aside>
        </div>
    )
}