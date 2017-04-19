#include <ArduinoJson.h>
const int seed = 23;
void setup() {
  Serial.begin(115200);
  randomSeed(analogRead(0) + seed);
  while (!Serial) {
  }
}

void loop() {
  Serial.print(random(0, 3500));
  Serial.print(":");
  Serial.print(random(0, 70000));
  Serial.print(":");
  Serial.print("42877442");
  Serial.print(":");
  Serial.print("-1747645");
  Serial.print(";");
  delay(500);
}
