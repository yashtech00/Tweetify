import RightPanel from "../components/RightSideBar";
import { SideBar } from "../components/SideBar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-full bg-black min-h-screen">
          <div className="flex w-full max-w-6xl">
          <SideBar/>
              <div className="flex-1 border-x border-stone-800 bg-black"> 
              
                  {children}
                  </div>
              <RightPanel/>
      </div>
    </div>
  )
    
}