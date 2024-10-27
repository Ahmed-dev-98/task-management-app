import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const LandingPage = () => {
  const { login, register } = useKindeAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative bg-indigo-600 text-white py-40">
        <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Your Tasks Efficiently
          </h1>
          <p className="text-lg md:text-xl max-w-lg">
            Keep track of all your tasks, organize priorities, and stay
            productive. Our task management app helps you achieve your goals
            seamlessly.
          </p>{" "}
          <div className="flex gap-3 items-center justify-center">
            <Button
              onClick={() => login()}
              className="mt-6 px-8 py-3 min-w-[7rem] bg-white text-indigo-600 rounded-lg shadow-md hover:bg-gray-200 transition duration-200"
            >
              Login
            </Button>
            <Button
              onClick={() => register()}
              className="mt-6 px-8 py-3 min-w-[7rem] bg-white text-indigo-600 rounded-lg shadow-md hover:bg-gray-200 transition duration-200"
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-t-3xl" />
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Features</h2>
          <p className="text-lg text-gray-600 mt-4">
            Everything you need to organize, prioritize, and achieve more.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold text-indigo-600">
                Task Lists
              </h3>
              <p className="text-gray-600 mt-2">
                Create and categorize tasks to manage projects and personal
                goals with ease.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold text-indigo-600">
                Priority Levels
              </h3>
              <p className="text-gray-600 mt-2">
                Set task priorities to stay focused on what’s most important.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold text-indigo-600">
                Team Collaboration
              </h3>
              <p className="text-gray-600 mt-2">
                Collaborate with your team in real-time and stay updated on
                progress.
              </p>
            </div>{" "}
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold text-indigo-600">
                Authentication & authorization
              </h3>
              <p className="text-gray-600 mt-2">
                Avoide missing tasks , or keeping it public using our
                authentication and authorization features
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold text-indigo-600">
                Role based access
              </h3>
              <p className="text-gray-600 mt-2">
                Our Role Based Access feature provides you with the ability to
                manage your employees Efficiently
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold text-indigo-600">
                Data analytics
              </h3>
              <p className="text-gray-600 mt-2">
                Our dashboard provides you with an analytics report to keep
                track of your tasks and employees
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold">
            Ready to boost your productivity?
          </h2>
          <p className="text-lg mt-4">
            Join thousands of users who are managing tasks effectively and
            reaching their goals.
          </p>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Ahmed-dev. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
