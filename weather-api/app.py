from flask import Flask, jsonify
import adafruit_dht
import board
from RPi import GPIO

app = Flask(__name__)

@app.route('/readings')
def get_readings():
    try:
        # Initialize the DHT device inside the route function
        dht_device = adafruit_dht.DHT11(board.D4)
        temperature_c = dht_device.temperature
        humidity = dht_device.humidity
        
        # Check if readings are valid
        if temperature_c is not None and humidity is not None:
            temperature_f = int(temperature_c * (9 / 5) + 32)
            return jsonify({
                'temperature_c': temperature_c,
                'temperature_f': temperature_f,
                'humidity': humidity
            })
        else:
            return jsonify({'error': 'Failed to retrieve data from sensor'}), 500
    except RuntimeError as error:
        # Catch runtime errors from the sensor
        return jsonify({'error': str(error)}), 500
    finally:
        # Cleanup the sensor after use
        dht_device.exit()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
