
export const Tweet = ({tweet}) => {
    return (
        <div className="border-b border-gray-200 p-4">
            <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-gray-700">@{tweet.user.username}</p>
              <p className="text-gray-800 mt-1">{tweet.content}</p>
              <div className="flex space-x-6 mt-2 text-sm text-gray-500">
                <div>❤️ {tweet.likes.length}</div>
                <div>💬 {tweet.comments.length}</div>
              </div>
            </div>
          </div>
        </div>
    )
}