from flask import Flask, jsonify
import adafruit_dht
import board
from RPi import GPIO
import threading
import time

# global constants
temp_c = 0
temp_f = 0
humid  = 0

def get_dht_readings():
    global temp_c, temp_f, humid
    while True:
        prev_temp_c = temp_c
        prev_temp_f = temp_f
        prev_humid = humid

        try:
            dht_device = adafruit_dht.DHT11(board.D4)
            temperature_c = dht_device.temperature
            humidity = dht_device.humidity
            
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
            dht_device.exit()
        
        time.sleep(5)  # Wait for 5 seconds before the next read

def start_dht_readings_thread():
    thread = threading.Thread(target=get_dht_readings)
    thread.daemon = True  # Daemonize thread
    thread.start()

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
    start_dht_readings_thread()  # Start the sensor readings update thread
    app.run(host='0.0.0.0', port=5000, debug=True)
    
if __name__ == '__main__':
    main()