

export const RightSideBar = () => {





    return (
        <div className="hidden lg:block sticky top-4 w-72 p-4 ml-4 bg-white rounded-xl shadow-sm h-fit">
  <p className="text-lg font-semibold mb-4">Who to follow</p>
  <div className="space-y-4">
    {/* Suggested user card placeholder */}
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div>
          <p className="font-semibold text-sm">Jane Doe</p>
          <p className="text-sm text-gray-500">@janedoe</p>
        </div>
      </div>
      <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600">Follow</button>
    </div>
  </div>
</div>

    )
}