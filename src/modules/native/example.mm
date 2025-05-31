#include <napi.h>
#import <Cocoa/Cocoa.h>
#import <ApplicationServices/ApplicationServices.h>

Napi::Value SampleFunction(const Napi::CallbackInfo& info) {
  return Napi::String::New(info.Env(), "This data is being passed as a return string from a native module using napi - see 'example.mm'");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "sampleFunction"),
              Napi::Function::New(env, SampleFunction));
  return exports;
}

NODE_API_MODULE(simulator, Init)













