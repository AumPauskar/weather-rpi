from flask import Flask, jsonify
import adafruit_dht
import board
from RPi import GPIO

# global constants
temp_c = 0
temp_f = 0
humid  = 0

def get_dht_readings():
    # previous tempratures in case of error reading temps
    global temp_c, temp_f, humid
    prev_temp_c = temp_c
    prev_temp_f = temp_f
    prev_humid = humid

    try:
        # Initialize the DHT device inside the route function
        dht_device = adafruit_dht.DHT11(board.D4)
        temperature_c = dht_device.temperature
        humidity = dht_device.humidity
        
        # Check if readings are valid
        if temperature_c is not None and humidity is not None:
            temperature_f = int(temperature_c * (9 / 5) + 32)
            temp_c = temperature_c
            temp_f = temperature_f
            humid = humidity
        else:
            temp_c = prev_temp_c
            temp_f = prev_temp_f
            humid = prev_humid
    except RuntimeError as error:
        print(str(error))
    finally:
        # Cleanup the sensor after use
        dht_device.exit()

app = Flask(__name__)

@app.route('/readings')
def get_readings():
    global temp_c, temp_f, humid
    try:
        return jsonify({
            'temperature_c': temp_c,
            'temperature_f': temp_f,
            'humidity': humid
        }), 200
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500
    

def main():
    print(get_dht_readings())
    app.run(host='0.0.0.0', port=5000, debug=True)
    
if __name__ == '__main__':
    main()
