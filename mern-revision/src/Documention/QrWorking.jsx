import qrImage from '../assets/DocsImages/home_image.jpg'
import liveImage from '../assets/DocsImages/liveqr.jpg'
import utilityImage from'../assets/DocsImages/qrutilities.jpg'
import image1 from '../assets/DocsImages/wrong qr.jpg'


function QrWorking() {
    return (
        <div className="text-white antialiased mt-5 bg-black min-h-screen flex flex-col items-center justify-center px-6">
            {/* Title */}
            <h1 className="text-center text-3xl font-bold mb-4">
                Here we get to know how <span className="text-5xl text-red-500 font-bold">QR Works</span>
            </h1>

            {/* QR Image */}
            <img src={qrImage}  alt="QR Code" className="border border-green-100 w-200 h-80 mt-10  mb-10" />

            <h2 className='text-red-500 text-3xl font-bold mt-6 mb-4'>------------------Documentaion Section------------------</h2>

            {/* Documentation Section */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl text-left">
                <h2 className="text-2xl font-bold mb-4">Understanding How QR Codes Work</h2>

                <h3 className="text-xl font-semibold mt-4">1. Introduction</h3>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    A QR (Quick Response) code is a type of matrix barcode that stores data such as URLs, text, or payment details.
                    Scanning a QR code quickly retrieves this information using a smartphone or scanner.
                </p>

                <h3 className="text-xl font-semibold mt-4">2. How QR Codes Work</h3>

                <h4 className="text-lg font-semibold mt-2">📌 Encoding Information</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    QR codes encode data in a two-dimensional format using black and white squares.
                </p>

                <h4 className="text-lg font-semibold mt-2">📌 QR Code Structure</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    A QR code consists of position markers, alignment patterns, timing patterns, and data modules.
                </p>

                <h4 className="text-lg font-semibold mt-2">📌 Scanning Process</h4>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    When a scanner detects a QR code, it deciphers the data using pattern recognition.
                </p>

                <h3 className="text-xl font-semibold mt-4">3. QR Code Scanner</h3>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    Below is a live QR code scanner. Place a QR code in front of the camera to scan and retrieve its information.
                </p>
                <img src={liveImage} alt="Wrong QR Code Scan" className="w-full h-auto mt-4 rounded-lg" />


                 {/* Wrong QR Code Section */}
                 <h3 className="text-xl font-semibold mt-6">4. What Happens If You Scan a Wrong QR Code?</h3>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    If you scan an incorrect QR code, you may receive an invalid response, error message, or be redirected to a phishing website. 
                    Always verify the source before scanning a QR code.
                </p>
                <img src={image1} alt="Wrong QR Code Scan" className="w-full h-auto mt-4 rounded-lg" />

                <h3 className="text-xl font-semibold mt-6">5. Utilities That Can Be Accessed via QR Codes</h3>
                <p className="text-gray-300 text-sm mt-2 mb-2">
                    QR codes are widely used for:
                </p>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2 mb-2">
                    <li> Gate Entries</li>
                    <li> Marking Attendance</li>
                    <li> Task Management</li>
                    <li> Community Access</li>
                    and many more such utilities...
                </ul>
                <img src={utilityImage} alt="Wrong QR Code Scan" className="w-full h-auto mt-4 rounded-lg" />

                <h3 className="text-xl font-semibold mt-4">6. Advantages of QR Codes</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm mt-2 mb-2">
                    <li>Fast scanning & easy access</li>
                    <li>Can store large amounts of data</li>
                    <li>Secure & trackable (for dynamic QR codes)</li>
                </ul>

                

                
            </div>
        </div>
    );
}

export default QrWorking;
