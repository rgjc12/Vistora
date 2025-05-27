import PageHeader from "../../../pages/Profile/components/PageHeader.jsx";
import { Mail, Phone, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="p-6">
      <PageHeader title="Contact Support" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">
            Available Monday-Friday, 9am-5pm EST
          </p>
          <a href="tel:1-800-123-4567" className="text-blue-600 font-medium">
            1-800-123-4567
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-green-600" size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
          <a
            href="mailto:support@claimsdashboard.com"
            className="text-blue-600 font-medium"
          >
            support@claimsdashboard.com
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="text-purple-600" size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">
            Chat with our support team in real-time
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Start Chat
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Send us a message</h3>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input type="email" className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea className="w-full p-2 border rounded" rows="5"></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
