---
title: "You're Absolutely Right" and the Whole AI Thing
published_at: 2025-12-13T11:59:54.692Z
snippet: AI doesn't erase skill differences in software development, it amplifies them. Research proves it, my six years in the industry confirm it, and if you're using AI as a magic wand instead of a power tool, you're part of the problem. Here's what the data actually says about individual talent in the age of AI.
tags: artificial-intelligence, software-development, career, AI-tools, code-quality, research, developer-skills, junior-developers, tech-bubble
---

![Hey Claude, prod is down](https://assets.gmaltez.dev/hey-claude-prod-is-down.jpg)

I use AI every single day. For work, for personal projects, for learning. It's undeniably useful. I'd be lying if I said it hasn't made me a better developer. But here's the thing that nobody wants to talk about: AI isn't making everyone equally good. It's making good developers great and exposing how many people have no idea what they're actually doing.

A recent study from Penn State and the University of Connecticut titled ["Generative AI Does Not Erase Individual Differences in Human Creativity"](https://osf.io/preprints/psyarxiv/jszrn_v1) just confirmed what I've been seeing in the industry for the past couple of years. People who were better at their craft before AI are still better with AI. People who sucked before AI still suck, they just suck faster now.

Let me explain why this matters, why the current AI spending looks like a bubble to me, and why your ability to actually understand what you're building has never been more important.

## The Research: AI Amplifies Talent, Doesn't Level It

The study tested 442 people across two experiments. They measured baseline creativity and intelligence, then gave everyone access to ChatGPT (GPT-3.5-Turbo in Study 1, GPT-4o in Study 2) for creative tasks. The results were clear:

**People who wrote better stories without AI also wrote better stories with AI.**

As the researchers put it: _"people who wrote more original stories without AI also wrote better stories with AI"_ (β = .42 in Study 1). Study 2 replicated this, showing that _"people who were more creative (β = .39) and intelligent (β = .35) in general performed better on entirely different creative tasks done with AI assistance."_ Together, these factors explained 40% of the variance in AI-assisted creative performance.

Think about what this means. Everyone got access to the same powerful tool. Everyone had equal opportunity. But the outcomes weren't equal. Individual skill still mattered. A lot.

The researchers made a big discovery: _"We isolate for the first time a latent construct for AI-assisted creativity, unique and separable from creativity without AI."_ In other words, AI-assisted creativity is its own measurable skill. You can be a creative genius on your own and still be clueless when it comes to working with AI. You can be really smart but have no idea how to actually get value out of these tools. They're related, sure, but they're not the same thing.

This isn't just about creative writing. This is about any knowledge work where AI is involved. Including software development.

## My Experience: The Shift from Coding Monkey to Software Architect

I've been writing code professionally for almost six years. Started as a junior at 19, made senior, and [took on the tech lead role twice](/blog/i-became-a-tech-lead-twice-and-quit-both-times-heres-what-i-learned). I've seen the industry change drastically, especially in the last two years.

Here's what AI changed for me: I spend way less time actually writing code than I used to. And no, that doesn't make me a "vibe coder."

There's a massive difference between a vibe coder and a software engineer using AI properly. Let me break it down:

**Vibe Coder:**

```txt
Developer: "Hey Claude, create a website that does X, Y, and Z"
AI: [generates 500 lines of code]
Developer: [copies, pastes, commits]
Developer: "It works! Ship it!"
```

**Actual Software Engineer:**

```txt
Developer: [analyzes the problem]
Developer: [designs architecture]
Developer: [plans data flow, error handling, edge cases]
Developer: "Hey Claude, here's the architecture I need. 
        Build the boilerplate for these components.
        Use this pattern for state management.
        Here's why we're doing it this way..."
AI: [generates code following the plan]
Developer: [reviews every line]
Developer: [catches the security issue in line 47]
Developer: [refactors the inefficient loop]
Developer: [adds proper error handling AI missed]
Developer: [tests edge cases]
Developer: "Okay, now it's actually ready"
```

See the difference? One is using AI as a magic wand. The other is using AI as a power tool.

I'd say AI gets me about 70% of the way there on most tasks. But that last 30%? That's where the actual engineering happens. That's where you need to understand what you're building and why.

## The Problem: AI Trained on Shit Code

Here's something most people don't think about: AI was trained on the majority of existing code on the internet. And the majority of code on the internet is shit. That's just a fact.

Most code works, sure. But it doesn't scale. It's hard to understand. It has security issues. It's over-engineered or under-engineered. It's full of anti-patterns and technical debt.

So when you ask AI to "create a REST API", it's going to give you what it learned from millions of mediocre REST APIs. It'll work. It might even pass your tests. But it won't be good.

**Example - Vibe Coder Approach:**

```javascript
// What AI might give you by default
app.get("/users/:id", async (req, res) => {
  const user = await db.query(
    "SELECT * FROM users WHERE id = " + req.params.id,
  );
  res.json(user);
});
```

Congratulations, you just shipped a SQL injection vulnerability. AI gave you working code. It just happens to be a security disaster.

**What an actual engineer would do:**

```javascript
// What you should actually ship
app.get("/users/:id", async (req, res) => {
  try {
    // Input validation
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Parameterized query (no SQL injection)
    const user = await db.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [userId],
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    logger.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

The difference? Understanding what can go wrong. Knowing about SQL injection. Thinking about error cases. Logging for debugging. Not exposing sensitive data.

AI doesn't know your specific security requirements. It doesn't know your error handling standards. It doesn't know your logging strategy. You do. Or at least, you should.

## The Surgical Robot Analogy

Think about a surgeon using a state-of-the-art surgical robot. If that surgeon kills a patient because they weren't paying attention, whose fault is it? The robot's? No. It's the surgeon's fault. Simple as that.

You have total responsibility for the code you ship. AI is a tool, not a scapegoat.

If you think you shouldn't be held responsible for AI-generated code you don't understand, well, you're in the pool of people who can and will be replaced by AI. It's a simple equation: if you provide no value in the process, you're just noise. You can be removed.

The value you provide isn't typing characters into a file. It's understanding the problem, designing the solution, making architectural decisions, catching edge cases, ensuring security, optimizing performance, and being able to explain why the code works the way it does.

## The AI Bubble and Why It Matters

Look, I don't want to be the guy who wears a tinfoil hat, but this whole AI thing is financially insane.

IBM's CEO recently said there's "no way" that spending trillions on AI data centers will pay off at today's infrastructure costs. Let me repeat that: the CEO of one of the biggest tech companies on the planet is saying the math doesn't add up.

The power consumption alone is ridiculous. [Google is building small nuclear reactors](https://www.bbc.com/news/articles/c748gn94k95o) just to power their AI data centers. The chips running these models at full capacity 24/7 last maybe 5 years. Same issue crypto mining had with GPUs burning out.

The numbers don't lie. Big tech now represents close to 40% of the S&P 500. [Look at the historical sector weightings](https://en.macromicro.me/collections/34/us-stock-relative/121244/sp-500-gics-sectors-weightings-monthly). Tech and Communication Services combined haven't been this dominant since the dot-com bubble. Companies are spending trillions on AI infrastructure with no clear path to profitability at current costs.

![S&P 500 Sector Weightings Over Time](https://assets.gmaltez.dev/sp500-sector-weightings-over-time.png)

This has all the warning signs of a bubble. Massive investment based on hype. Economics that don't add up. Everyone assuming infinite growth. Sound familiar? It should. We saw this in 2008 with the housing market.

If this bubble bursts, guess who pays the price? Not the CEOs of these companies. It'll be regular people. Layoffs. Economic impact. Retirement funds taking hits. The same pattern repeats.

I'm not saying AI isn't useful. I'm saying the current spending and infrastructure investment doesn't match realistic returns. It's unsustainable.

## The Junior Developer Problem

If you're trying to break into software development right now, you're facing the hardest market in years. And AI is making it worse.

Three reasons:

1. **The market isn't what it was during the pandemic.** Companies aren't throwing money at any developer who can write a for loop anymore.

2. **Tasks traditionally done by juniors are getting automated.** The repetitive, boring, simple stuff? AI can do a lot of that now. Which means companies need fewer juniors to handle grunt work.

3. **Companies are falling for the "AI will replace engineers" BS.** Some are actually firing entire teams, thinking AI can do it all. (Spoiler: it can't. They'll learn the hard way.)

But here's the thing: if you're a junior who actually understands what you're building, if you can use AI as a tool rather than a crutch, you're more valuable than ever. The bar is higher, but the opportunity is still there.

My advice for juniors (I'll dig deeper on this in another post):

- Learn fundamentals. If you can't explain Big O notation or why SQL injection happens, AI won't save you. It generates code, it doesn't build intuition.
- Use AI as a tutor, not a shortcut. Ask "explain how this async/await works" instead of "fix this for me."
- Review every line of code AI generates. Understand why it works (or doesn't).
- Build things. Real things. Things where you have to make architectural decisions, not just string together AI outputs.

The juniors who make it through this market will be exceptionally good. Because they have to be.

## The Responsibility Crisis

Here's what scares me most: people are using AI as a single source of truth for everything, and they're becoming unable to do simple things without double-checking with AI first. Whatever AI says, that's it. No critical thinking. No verification.

I've seen developers ship code they don't understand because "AI wrote it and it passed the tests." I've seen people make architectural decisions based solely on what ChatGPT suggested, without understanding the tradeoffs.

This is negligent. A surgeon operating a surgical robot still needs to understand anatomy and surgical principles. The robot doesn't make decisions, it executes them. Same with AI and code.

**You're responsible for what you build. Period.** If you can't explain why your code works, if you can't debug it when it breaks, if you don't understand the security implications, you shouldn't be shipping it.

## Security Risks Are Real

Speaking of security, there's a whole class of attacks specifically targeting AI-assisted development. Prompt injection attacks can exfiltrate data from your codebase. [There are documented cases of this happening](https://www.promptarmor.com/resources/google-antigravity-exfiltrates-data).

In one example, researchers showed how a hidden prompt injection (in 1-point font, invisible to humans) on a random blog post could trick Google's Antigravity IDE into stealing AWS credentials from a developer's `.env` file. The AI bypassed its own security restrictions, built a URL with the stolen credentials, and sent them to an attacker-controlled server. All while the developer thought they were just reading an API integration guide.

If you're using AI to build stuff without carefully reviewing everything it generates, you're one deployment away from a security incident. The surgical robot analogy applies here too: if you're not monitoring what the tool is doing, you're going to hurt someone (eventually).

## What the Research Actually Means

Let's go back to that Penn State study. The key finding wasn't just that skilled people do better with AI. It was that AI-assisted creativity is a distinct skill.

You can be a great developer without AI and terrible at using AI effectively. You can be smart but not know how to extract value from AI tools. It's a separate competency.

The study found that verbal creativity (metaphor generation) was the strongest predictor of AI-assisted creative performance when controlling for other creativity measures. The researchers note this is likely due to domain-specificity: _"Rather than being an indicator that visual art and scientific creativity are less important, this is more likely evidence for domain-specificity of how human creativity impacts AI-assisted creativity (given that all AI-assisted creativity [tasks] were verbal in nature)."_

What does that mean for developers? Since most AI-assisted development involves verbal communication (prompts, architecture descriptions, explaining what you want and why), your ability to communicate clearly with AI matters. A lot.

The study also found that _"general intelligence predicted AI-assisted performance beyond baseline creativity."_ People who could think critically, solve problems, and reason about tradeoffs did better with AI tools.

This makes sense. AI is powerful, but it's not magic. You still need to understand the problem domain. You still need to make decisions. You still need to evaluate the output critically.

## The Shift in Developer Roles

Developers are shifting from "coding monkeys" to "software architects." But most people are becoming "vibe coders" instead.

A coding monkey just implements what they're told. No thinking required. Just type.

A vibe coder asks AI to do everything and hopes it works.

A software architect:

- Understands the problem deeply
- Designs the solution architecture
- Makes informed technology choices
- Uses AI to accelerate implementation
- Reviews and validates everything
- Takes responsibility for the outcome

The value of a developer used to be in typing speed and syntax knowledge. Now it's in problem-solving, architecture, critical thinking, and judgment. AI can generate code. It can't make strategic decisions about your product.

If I said I spend most of my time actually writing code, I'd be lying. I spend my time:

- Understanding requirements
- Designing systems
- Making architectural decisions
- Reviewing code (mine and others')
- Debugging complex issues
- Optimizing performance
- Ensuring security

AI helps with all of this. But it doesn't replace any of it.

## What You Should Actually Do

Based on everything I've seen and what the research shows, here's what matters:

**1. Treat AI like a power tool, not a magic wand.**

You wouldn't hand a circular saw to someone who's never used tools and expect them to build a house. AI is the same. It's powerful in skilled hands. It's dangerous in unskilled hands.

**2. Your baseline skills matter more than ever.**

The research is clear: _"people with more creative task expertise (Study 1) and those with higher baseline cognitive abilities (Study 2) produced more original ideas, despite all participants having equal access to a powerful LLM."_ If you're bad at your craft, AI will just help you be bad faster.

Invest in fundamentals:

- Understand computer science basics (data structures, algorithms, complexity)
- Learn software design patterns and principles
- Study security best practices
- Master debugging and problem-solving
- Develop code review skills

**3. Learn how to guide AI effectively.**

This is a separate skill. As the researchers discovered, AI-assisted creativity is _"related but independent from creative ability and general intelligence."_ Being good at your job and being good at using AI to do your job are related but different.

Practice:

- Writing clear, specific prompts
- Providing context and constraints
- Asking for explanations, not just solutions
- Iterating and refining outputs
- Knowing when AI is wrong

**4. Review everything. Trust nothing.**

Every line of AI-generated code should be reviewed. Not skimmed. Actually reviewed. Understand what it does, why it does it, and what could go wrong.

AI doesn't work without an engineer who understands what's happening.

**5. Stay aware of the bigger picture.**

The AI bubble looks real to me. The economics don't make sense long-term. Companies are making stupid decisions based on hype.

Don't bet your career on AI eliminating the need for skilled developers. Bet on AI amplifying the value of skilled developers. As the paper concludes: _"generative AI does not eliminate cognitive advantages but rather preserves robust individual differences in human intelligence and creativity."_

**6. Build things that matter.**

Use AI to build better products faster. Use it to solve harder problems. Use it to learn and grow. Don't use it as a crutch to avoid understanding your craft.

The developers who thrive in the AI era won't be the ones who let AI do all the thinking. They'll be the ones who use AI to think bigger, build better, and deliver more value.

## Final Thoughts

AI hasn't eliminated individual differences in software development. If anything, it's made them more obvious.

The developers who were good before AI are better with AI. The developers who were struggling before AI are still struggling, they're just producing more code they don't understand.

After six years in this industry, going from junior to senior to tech lead and back, I've learned this: tools change, but fundamentals don't. The best developers aren't the ones with the fanciest tools. They're the ones who understand what they're building and why.

AI is an incredibly powerful tool. Use it. Learn it. Get good at it. But don't mistake having access to powerful tools for being skilled. The research proves it: _"Our findings suggest that the successful use of generative AI may preserve individual differences in human creativity and intelligence."_ Your individual abilities still matter. A lot.

So here's what I want you to do:

**Stop being a vibe coder.** Stop blindly trusting AI output. Stop treating it as a magic solution to not having to understand your craft.

**Start being an engineer.** Understand the problems you're solving. Design thoughtful solutions. Use AI to accelerate your work, not replace your thinking. Review everything. Take responsibility for what you build.

**Be aware of the bubble.** The current AI spending is unsustainable. The economics don't work. Don't make career decisions based on hype. Make them based on building real skills that provide real value.

**Keep learning.** Your ability to learn, adapt, and grow matters more than ever. AI will keep changing. The fundamentals won't.

The future belongs to developers who can use AI effectively while understanding what they're building. Not to vibe coders who think access to the latest AI model makes them senior engineers.

Your individual skills matter. The research proves it. My experience confirms it. And if you're treating AI as a replacement for understanding your craft instead of a tool to amplify it, you're setting yourself up for failure.

**References:**

[Luchini, S. A., Kaufman, J. C., & Beaty, R. E. (2025). Generative AI Does Not Erase Individual Differences in Human Creativity. _Department of Psychology, Pennsylvania State University; Neag School of Education, University of Connecticut._](https://osf.io/preprints/psyarxiv/jszrn_v1)

["IBM CEO says there is 'no way' spending trillions on AI data centers will pay off at today's infrastructure costs." _Business Insider_, December 2025.](https://www.businessinsider.com/ibm-ceo-big-tech-ai-capex-data-center-spending-2025-12)

["Google Antigravity Attack Exfiltrates Data." _Prompt Armor Resources_, 2025.](https://www.promptarmor.com/resources/google-antigravity-exfiltrates-data)

["Google signs deal for small nuclear reactors to power AI." _BBC News_, October 2024.](https://www.bbc.com/news/articles/c748gn94k95o)

["S&P 500 GICS Sectors Weightings (Monthly)." _MacroMicro_, 2025.](https://en.macromicro.me/collections/34/us-stock-relative/121244/sp-500-gics-sectors-weightings-monthly)
