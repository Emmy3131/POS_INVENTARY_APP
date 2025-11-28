const Settings = () => {
  return (
    <div>

      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold bg-white p-2 px-4 rounded-xl shadow">Account settings</h1>
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span>18:01pm</span>
          <span class="border-l border-gray-300 pl-4">28-08-2025</span>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        {/* Sidebar  */}
        <div class="w-full md:w-1/4 bg-white h-fit shadow-md rounded-2xl p-4 flex flex-col gap-2">
          <button id="profileBtn"
            class="flex items-center gap-2 p-3 rounded-lg text-gray-700 shadow-md font-semibold transition">
            <i class="fa-solid fa-user"></i> Profile Settings
          </button>
          <button id="passwordBtn"
            class="flex items-center gap-2 p-3 rounded-lg text-gray-700 font-semibold shadow-md transition">
            <i class="fa-solid fa-lock"></i> Password
          </button>
        </div>

        {/* Main Content  */}
        <div class="flex-1">
          {/* Profile Section  */}
          <div id="profileSection" class="bg-white shadow-md rounded-2xl p-4 transition-all duration-300 ease-in-out">
            {/* Profile Header  */}
            <div class="flex flex-col md:flex-row items-center justify-between rounded-xl p-6 bg-white shadow-sm">
              <div class="flex items-center gap-6">
                <img id="settingsProfilePicture" src="./userImage/IMG_20240712_183508_440.jpg" alt="Profile Photo"
                  class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                <div>
                  <h2 id="profileName" class="text-xl font-bold text-gray-800"></h2>
                  <p id="profilePhone" class="text-gray-600 text-sm"></p>
                  <p id="profileEmail" class="text-gray-500 text-sm"></p>
                </div>
              </div>

              <div class="flex gap-3 mt-4 md:mt-0">
                <label for="settingsProfileImageInput"
                  class="bg-green-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-600 shadow">
                  Upload New Photo
                </label>
                <input class="hidden" accept="Image/*" id="settingsProfileImageInput" type="file" />
                <button class="bg-gray-200 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-300">
                  Delete Photo
                </button>
              </div>
            </div>

            {/* Profile Form  */}
            <form class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-gray-700 mb-2 font-medium">Name</label>
                <input id="settingsProfileName" type="text" value=""
                  class="w-full rounded-full border border-gray-100 p-3 hover:border-green-300 outline-none transition duration-300" />
              </div>

              <div>
                <label class="block text-gray-700 mb-2 font-medium">Phone number</label>
                <input id="settingsProfilephone" type="text" value=""
                  class="w-full rounded-full border border-gray-100 p-3 hover:border-green-300 outline-none transition duration-300" />
              </div>

              <div>
                <label class="block text-gray-700 mb-2 font-medium">Email</label>
                <input id="settingsProfileEmail" type="email" value=""
                  class="w-full rounded-full border border-gray-100 p-3 hover:border-green-300 outline-none transition duration-300" />
              </div>

              <div>
                <label class="block text-gray-700 mb-2 font-medium">ID</label>
                <input type="text" value="POS-123"
                  class=" text-gray-400 w-full rounded-full border border-gray-100 p-3 hover:border-green-300 outline-none transition duration-300"
                  readonly />
              </div>

              <div class="md:col-span-2">
                <label class="block text-gray-700 mb-2 font-medium">Address</label>
                <input type="text" value="123 Main St, Cityville"
                  class="text-gray-400 w-full rounded-full border border-gray-100 p-3 hover:border-green-300 outline-none transition duration-300"
                  readonly />
              </div>

              <div class="md:col-span-2 flex justify-start space-x-4 mt-4">
                <button type="reset"
                  class="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 shadow">
                  Cancel
                </button>
                <button id="settingsSaveBtn" type="submit"
                  class="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 shadow">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Password Section */}
          <div id="passwordSection"
            class="hidden bg-white shadow-md rounded-2xl p-6 transition-all duration-300 ease-in-out">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Change password</h2>

            <form class="space-y-6">
              {/* Old Password */}
              <div>
                <label for="oldPassword" class="block text-gray-700 mb-2 font-medium">Old password</label>
                <input id="oldPassword" type="password" placeholder="Enter old password" value="123456789"
                  class="w-full rounded-full border border-gray-200 p-3 focus:ring-2 focus:ring-green-400 outline-none text-gray-500" />
              </div>

              {/* New + Confirm Password */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="newPassword" class="block text-gray-700 mb-2 font-medium">Enter new password</label>
                  <input id="newPassword" type="password" placeholder="Enter new password" value="0000000000"
                    class="w-full rounded-full border border-gray-200 p-3 focus:ring-2 focus:ring-green-400 outline-none text-gray-700" />
                </div>

                <div>
                  <label for="confirmPassword" class="block text-gray-700 mb-2 font-medium">Confirm password</label>
                  <input id="confirmPassword" type="password" placeholder="Confirm password" value="0000000000"
                    class="w-full rounded-full border border-gray-200 p-3 focus:ring-2 focus:ring-green-400 outline-none text-gray-700" />
                </div>
              </div>

              {/* button */}
              <div class="flex justify-end gap-4 pt-4">
                <button type="button"
                  class="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition">
                  Cancel
                </button>
                <button id="settingsChangePassword" type="submit"
                  class="px-6 py-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 shadow-md transition">
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Settings