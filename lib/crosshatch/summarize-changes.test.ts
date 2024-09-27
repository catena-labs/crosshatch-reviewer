import { describe, expect, it } from "bun:test"
import { parseDiff } from "../github/extract-changes-from-diff"
import { summarizeChanges } from "./summarize-changes"

const diff = `
diff --git a/packages/core/src/router-manager/executors/AWSBedrockExecutor.ts b/packages/core/src/router-manager/executors/AWSBedrockExecutor.ts
index e3a705327..8e6760873 100644
--- a/packages/core/src/router-manager/executors/AWSBedrockExecutor.ts
+++ b/packages/core/src/router-manager/executors/AWSBedrockExecutor.ts
@@ -20,9 +20,8 @@ export class AWSBedrockExecutor extends RouteExecutor {
     route: Route,
     rawRouteParams: RouteExecutionParams
   ): Promise<RouterResult> {
-    const routeParams = this.injectToolsContent(rawRouteParams)
-
-    const { callbacks, params, metrics, messages } = routeParams
+    const { callbacks, params, metrics } = rawRouteParams
+    const messages = this.getMessagesWithToolsContent(rawRouteParams)

     // TODO - AWS recommends using "AWS roles everywhere" for non-AWS workloads
     // instead of long-lived access keys. This is a temporary solution.
diff --git a/packages/core/src/router-manager/executors/AnthropicExecutor.ts b/packages/core/src/router-manager/executors/AnthropicExecutor.ts
index 23b310652..9a9fd4a2e 100644
--- a/packages/core/src/router-manager/executors/AnthropicExecutor.ts
+++ b/packages/core/src/router-manager/executors/AnthropicExecutor.ts
@@ -53,12 +53,12 @@ export class AnthropicExecutor extends RouteExecutor {
     // if there are no tools but there is toolsContent to be injected, then it means
     // the RouterManager pre-executed tools b/c this model cannot handle them directly
     // injecting toolsContent varies by executor, and Anthropic handles it by adding a new assistant message
-    const routeParams = toolsDefinitions
-      ? rawRouteParams
-      : this.injectToolsContent(rawRouteParams)
+    const inputMessages = toolsDefinitions
+      ? rawRouteParams.messages
+      : this.getMessagesWithToolsContent(rawRouteParams)

     // get Anthropic-specific message format
-    const { messages, system } = toAnthropicMessages(routeParams.messages)
+    const { messages, system } = toAnthropicMessages(inputMessages)

     // attempt to prevent anthropic tools usage from sharing its chain of thought
     const updatedSystemMessage = toolsDefinitions
@@ -127,7 +127,7 @@ export class AnthropicExecutor extends RouteExecutor {
               functionName,
               args,
               this.ctx,
-              routeParams
+              rawRouteParams
             )
             if (toolOutput) {
               // function call messages add to the input on a subsequent call and count as new tokens
@@ -201,15 +201,18 @@ export class AnthropicExecutor extends RouteExecutor {
     return transformAnthropicNonStreamingMessage(messageResponse)
   }

-  injectToolsContent(routeParams: RouteExecutionParams) {
-    const { toolsContent } = routeParams
+  getMessagesWithToolsContent(routeParams: RouteExecutionParams) {
+    const { toolsContent, messages: inputMessages } = routeParams
+    const messages = [...inputMessages]
+
     if (toolsContent && toolsContent.length > 0) {
-      routeParams.messages.push({
+      messages.push({
         role: "assistant",
         content: \`I have the following info that the user has not yet seen, which I MUST use to compose my reply. My info may include generated images and internet search results created by my tools. If my info contains image markdown, I MUST include it VERBATIM in my reply.<info>\n{toolsContent}\n</info>\`
       })
     }
-    return routeParams
+
+    return messages
   }

   getCutoffDateForModel(modelId: string) {
diff --git a/packages/core/src/router-manager/executors/GoogleGeminiExecutor.ts b/packages/core/src/router-manager/executors/GoogleGeminiExecutor.ts
index 269170da1..9a2a7133a 100644
--- a/packages/core/src/router-manager/executors/GoogleGeminiExecutor.ts
+++ b/packages/core/src/router-manager/executors/GoogleGeminiExecutor.ts
@@ -44,8 +44,8 @@ export class GoogleGeminiExecutor extends RouteExecutor {
     route: Route,
     rawRouteParams: RouteExecutionParams
   ): Promise<RouterResult> {
-    const routeParams = this.injectToolsContent(rawRouteParams)
-    const { callbacks, params, metrics, messages } = routeParams
+    const { callbacks, params, metrics } = rawRouteParams
+    const messages = this.getMessagesWithToolsContent(rawRouteParams)

     const googleAI = new GoogleGenerativeAI(this.ctx.env.GOOGLE_AI_API_KEY)

diff --git a/packages/core/src/router-manager/executors/HuggingFaceExecutor.ts b/packages/core/src/router-manager/executors/HuggingFaceExecutor.ts
index 000c8b8b1..e865bb6e0 100644
--- a/packages/core/src/router-manager/executors/HuggingFaceExecutor.ts
+++ b/packages/core/src/router-manager/executors/HuggingFaceExecutor.ts
@@ -15,8 +15,8 @@ export class HuggingFaceExecutor extends RouteExecutor {
     route: Route,
     rawRouteParams: RouteExecutionParams
   ): Promise<RouterResult> {
-    const routeParams = this.injectToolsContent(rawRouteParams)
-    const { callbacks, metrics, messages, params } = routeParams
+    const { callbacks, metrics, params } = rawRouteParams
+    const messages = this.getMessagesWithToolsContent(rawRouteParams)

     // get HuggingFace access
     const hf = new HfInference(undefined, {
diff --git a/packages/core/src/router-manager/executors/OpenAIExecutor.ts b/packages/core/src/router-manager/executors/OpenAIExecutor.ts
index 614499838..6de5b54f6 100644
--- a/packages/core/src/router-manager/executors/OpenAIExecutor.ts
+++ b/packages/core/src/router-manager/executors/OpenAIExecutor.ts
@@ -42,11 +42,9 @@ export class OpenAIExecutor extends RouteExecutor {

     // if there are no tools but there is toolsContent to be injected, then it means
     // the RouterManager pre-executed tools b/c this model cannot handle them directly
-    const routeParams = params.tools?.length
-      ? rawRouteParams
-      : this.injectToolsContent(rawRouteParams)
-
-    const messages = routeParams.messages
+    const messages = params.tools?.length
+      ? rawRouteParams.messages
+      : this.getMessagesWithToolsContent(rawRouteParams)

     // If the route has a timeout, set it on the OpenAI client, otherwise use the default
     if (route.timeout) {
@@ -114,7 +112,7 @@ export class OpenAIExecutor extends RouteExecutor {
               functionName,
               args,
               this.ctx,
-              routeParams
+              rawRouteParams
             )
             if (toolOutput) {
               // function call messages add to the input on a subsequent call and count as new tokens
diff --git a/packages/core/src/router-manager/executors/ReplicateExecutor.ts b/packages/core/src/router-manager/executors/ReplicateExecutor.ts
index d7171401f..289680a89 100644
--- a/packages/core/src/router-manager/executors/ReplicateExecutor.ts
+++ b/packages/core/src/router-manager/executors/ReplicateExecutor.ts
@@ -19,8 +19,8 @@ export class ReplicateExecutor extends RouteExecutor {
     route: Route,
     rawRouteParams: RouteExecutionParams
   ): Promise<RouterResult> {
-    const routeParams = this.injectToolsContent(rawRouteParams)
-    const { callbacks, params, metrics, messages } = routeParams
+    const { callbacks, params, metrics } = rawRouteParams
+    const messages = this.getMessagesWithToolsContent(rawRouteParams)

     // format and, if necessary, compress the messages into a prompt string
     const replicatePrompt = this.generatePrompt(route, messages)
diff --git a/packages/core/src/router-manager/executors/RouteExecutor.ts b/packages/core/src/router-manager/executors/RouteExecutor.ts
index 6601b4576..62e7163d7 100644
--- a/packages/core/src/router-manager/executors/RouteExecutor.ts
+++ b/packages/core/src/router-manager/executors/RouteExecutor.ts
@@ -236,26 +236,29 @@ export abstract class RouteExecutor {
   }

   /**
-   * Default mechanism to inject tools content into a prompt for a route.
-   * Each model may have an optimal way to set up a knowledgebase to handle a prompt, so this function can be overloaded.
-   *
-   * @param routeParams -- the route execution parameters
-   * @returns
+   * Injects tools content into the last message of the messages array.
+   * @param routeParams - The route execution parameters.
+   * @returns The messages array with tools content injected into the last message.
    */
-  injectToolsContent(routeParams: RouteExecutionParams) {
+  getMessagesWithToolsContent(
+    routeParams: RouteExecutionParams
+  ): ChatCompletionMessageParam[] {
+    const messages = [...routeParams.messages]
+
     const toolsContent = routeParams.toolsContent
+
     if (toolsContent && toolsContent.length > 0) {
       const kbInjection = \`To reply, use the following data that the user has not seen and does not yet know. The data may include image markdown and internet search results. If the info includes image markdown, you MUST ALWAYS use the image markdown in your reply verbatim with no changes:\n[info]:\n{toolsContent}\n\n[info]:\n\n\`
-      if (routeParams.messages[routeParams.messages.length - 1]) {
+      if (messages[messages.length - 1]) {
         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it exists
-        const lastMessageContent = routeParams.messages[
-          routeParams.messages.length - 1
-        ]!.content as string
+        const lastMessageContent = messages[messages.length - 1]!
+          .content as string
         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it exists
-        routeParams.messages[routeParams.messages.length - 1]!.content =
+        messages[messages.length - 1]!.content =
           '{kbInjection}{lastMessageContent}'
       }
     }
-    return routeParams
+
+    return messages
   }
 }
`

describe("summarizeDiff()", () => {
  it("works", async () => {
    const changes = parseDiff(diff)
    const result = await summarizeChanges(changes)
    console.log(result)
  })
})
