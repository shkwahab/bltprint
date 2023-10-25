import React from "react";
import { render, Printer, Text } from "react-thermal-printer";

async function handlePrinting() {
  try {
    const data = await render(
      <Printer type="epson">
        <Text>Hello World</Text>
      </Printer>
    );

    const port = await window.navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const writer = port.writable?.getWriter();
    if (writer != null) {
      await writer.write(data);
      writer.releaseLock();
    }

    // Properly close the port after printing
    await port.close();
  } catch (error) {
    console.error("Printing failed:", error);
  }
}

function App() {
  return (
    <div className="App">
      <button onClick={handlePrinting}>Print</button>
      <div>App is working</div>
    </div>
  );
}

export default App;
