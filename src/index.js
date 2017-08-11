
// The old and messy way:
const waitForMe_Old = function() {
    let bundledStuff;
    return getUserInput()
        .then((userInput) => {
            bundledStuff = {
                package: packageInputSynchronously(userInput),
                address: getServerAddress()
            };
            return bundledStuff;
        })
        .then((bundledStuff) => {
            return sendToServer(bundledStuff.address, bundledStuff.package)
        })
        .then((serverResponse) => {
            logIt(serverResponse, bundledStuff);
        });
};


/**
 * `async` - Denotes that the function has asynchronous behavior
 * `await` - Allows the thread to move to the next synchronous point of execution.
 *      The thread will then return to this point once the `await`ed function resolves.
 */

const waitForMe_New = async function() {
    const serverAddress = getServerAddress();
    const userInput = await getUserInput();
    const inputObject = packageInputSynchronously(userInput);
    const serverResponse = await sendToServer(serverAddress, inputObject);
    logIt(userInput, inputObject, serverResponse);
};


const getUserInput = () => {
    const button = document.getElementById('the-button');
    const textElem = document.getElementById('the-input');
    return new Promise((resolve, reject) => {
        button.addEventListener('click', () => {
            const inputValue = textElem.value;
            resolve(inputValue);
        });
    })
}

const getServerAddress = function() {
    return 'https://awesomesite.com/'
};

const packageInputSynchronously = (value) => {
    return { userSaid: value }
};

const sendToServer = (data, url) => {
    if(!url) {
        throw Error('NO url!');
    }
    if(!data) {
        throw Error('NO data!');
    }

    // Pretend this is an ajax request:
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = {
                status: 'Heck yeah!'
            }
            resolve(response);
        }, 2000);
    })
};

const logIt = (...rest) => {
    console.log(...rest);
};

waitForMe_Old();
waitForMe_New();
console.log('Now we wait');
