#include <ArduinoJson.h>
const int seed = 23;
void setup() {
  Serial.begin(115200);
  randomSeed(analogRead(0) + seed);
  while (!Serial) {
  }
}

void loop() {
  sendSerial("pre", random(0, 700));
  delay(100);
  sendSerial("temp", random(0, 35));
  delay(100);
  sendSerial("alt", random(400, 1200));
  delay(100);
}

int sendSerial(String sensor, float value) {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& receiverMessage = jsonBuffer.createObject();
  receiverMessage["sensor"] = sensor;
  receiverMessage["value"] = value;
  receiverMessage.printTo(Serial);
  Serial.println();
  return 0;
}
