---
title: The Broken Window Theory in Software Engineering
published_at: 2025-11-15T20:22:37.929Z
snippet: One small shortcut leads to another, then another, until your codebase is a mess. Here's why "just this once" never stays just once, what I learned from The Pragmatic Programmer, and how to actually prevent your code from becoming a broken window disaster.
tags: software-engineering, code-quality, technical-debt, best-practices, testing, ci-cd, team-culture, pragmatic-programmer, refactoring
---

There's a criminology theory from the 1980s called the broken window theory. The idea is simple: if a building has a broken window and nobody fixes it, people assume nobody cares about the building. Soon, more windows get broken. Then graffiti appears. Then more serious vandalism. The building deteriorates not because of one broken window, but because that one broken window signaled that disorder was acceptable.

I first read about this in "The Pragmatic Programmer" by Andrew Hunt and David Thomas, and I remember thinking: shit, this makes a lot of sense. This is exactly what happens at work.

One developer skips writing tests because "we'll add them later." Someone else sees that and thinks it's fine to skip tests too. Another person disables the type checker "temporarily" to fix a build. Someone commits code without running linters. Before you know it, your clean codebase has turned into a minefield of technical debt, and nobody knows how it got so bad.

The broken window theory explains perfectly how good codebases rot and why "just this once" is one of the most dangerous phrases in software development.

## The "Just This Once" Lie

Let me tell you about shortcuts I've seen compound over the years. These are the broken windows of software engineering.

### Production Code Without Tests Scares the Shit Out of Me

If you're building an MVP or a simple side project, fine, do whatever you want. But production code without test coverage? That's not a shortcut, that's a time bomb.

I'm not talking about writing a test file for each file you create. That's just dumb and creates brittle tests that make code harder to change. I'm talking about tests that make sure your software keeps behaving as it should when you modify it. The purpose of tests isn't to show a nice report that says 100% coverage. Sometimes 100% coverage is even worse than 70% coverage.

Here's the thing: code should be easy to change. If you can't change it without refactoring a bazillion test files, your code wasn't implemented properly in the first place. Tests should give you confidence to refactor, not prevent you from doing it.

But here's what happens in teams without a testing culture: one person ships a feature without tests because they're "in a hurry." It works. Nobody complains. The next person sees that and thinks, "well, if they didn't write tests, why should I?" The broken window multiplies.

Six months later, you have a codebase where nobody writes tests, and every deploy is a game of Russian roulette.

### The TODO Comment That Lived for 2 Years

I found a TODO comment I wrote myself 2 years ago. It said:

```javascript
// TODO: THIS CODE NEEDS REFACTOR !!!!
```

Four exclamation marks. I was really serious about it back then. From time to time, I'd see it in the file and think, "yeah, I should fix that." But it kept working. Nobody complained. "Technical debt we'll tackle later..."

It's still there.

That's the broken window right there. Not the messy code. The accepted practice of leaving TODO comments forever. Once one TODO stays, more TODOs pile up. Soon your codebase has dozens of them, and they all mean nothing because everyone knows they'll never get done.

### Typecheck Is a MUST

This one makes me angry.

Typecheck is a MUST. It is a MUST. Code should not hit production if you have typecheck issues. Period.

But here's what happened on one of my projects: during a build pipeline change, typecheck got disabled (yeah, esbuild is fast because it just doesn't give a fuck about typecheck). "We'll fix that later." The broken window was created. With typecheck disabled and undisciplined developers (and I'm not just talking about juniors, I've seen seniors do this), people started pushing code without checking for type errors.

One week. It took one entire week to fix all the type issues that accumulated because of that "temporary" disable. Type errors everywhere. Code that shouldn't have compiled was running in production. It was a mess.

If you have TypeScript, use it properly or don't use it at all. Disabling strict mode or ignoring type errors is like having a smoke detector and removing the batteries because the beeping annoys you.

## New Projects vs Legacy Projects

The broken window theory applies differently depending on whether you're starting fresh or dealing with legacy code.

### New Projects: Prevention Is Everything

With a new project, you have the luxury of setting standards from day one. This is your chance to prevent broken windows before they appear.

Set up a good CI/CD pipeline. Configure linters. Add tools like SonarQube for code quality. Set up Sentry or similar for error monitoring. Write unit tests and E2E tests. Add pre-commit hooks.

But here's the catch: this needs to be done carefully. If you don't monitor it, it becomes hell.

I've seen projects where the pre-commit hooks run unrelated tests every time you try to commit. Or tests with random timeouts. Or flaky tests that fail 30% of the time for no reason. What started as a way to prevent bad code and save time turns into a massive impediment. Commits taking 10-15 minutes to complete on small changes. Developers getting frustrated and finding ways around the checks.

The tools are meant to help, not create busywork. If your CI pipeline is so strict that it slows down development by 50%, you've overcorrected. You've replaced broken windows with iron bars on every window, and now nobody can get any work done.

### Legacy Projects: Strategic Fixes

Legacy projects are harder. The windows are already broken. The graffiti is already there. You can't just rewrite everything from scratch (though sometimes it feels easier to do that than fix the mess).

For legacy codebases, you need strategy. Think about your team, your project, what you can do, and most importantly, what you can't do. You need incremental ways to ensure code quality.

This is where paying off technical debt comes in. You can't fix everything at once, but you can apply the Boy Scout rule: leave the code better than you found it. Every time you touch a file, clean it up a little. Add a test. Fix the type errors. Remove the dead code.

But you need team buy-in. If one person is cleaning up and five others are still breaking windows, you're fighting a losing battle.

The worst thing I've seen with legacy projects is the attitude of "well, it's already a mess, so why bother?" That's how bad codebases stay bad forever.

## Trunk-Based Development vs Long-Lived Branches

How you manage your code affects how quickly broken windows multiply.

Trunk-based development (TBD) is amazing. I really love it. But it needs a really good team culture, organized developers, people who genuinely care about the output of their work. People who build something and want to show others, "look, I'm proud of this code I just wrote."

With TBD, broken windows are visible immediately. You can't hide messy code in a long-lived branch for weeks. If you commit something bad, everyone sees it in the main branch. This forces discipline.

But if you don't have the tools to prevent developers from messing up the code, TBD becomes a nightmare. Undisciplined developers plus weak CI/CD pipelines equals hell. And when I say undisciplined developers, I'm not talking about juniors. I've seen juniors with extraordinary discipline and seniors making the same mistakes over and over again, creating more technical debt with each feature they deliver.

Long-lived branches, on the other hand, are HELL. Especially on big teams.

My four years at a startup taught me about the merge hell of trying to merge a 2-3 month old branch into a legacy project. By the time you're ready to merge, the main branch has diverged so much that resolving conflicts is a nightmare. I've literally seen cases where it was easier to rewrite the feature on top of main than to merge the branch.

Long-lived branches hide broken windows until merge time. Problems compound in isolation, and when you finally try to integrate, you discover all the shortcuts, all the skipped tests, all the type errors at once.

## Small Teams vs Big Teams

Team size matters more than people think.

Small teams are the way to go. Big teams just don't work. They don't work.

With big teams, you have too many people to manage. Some people feel distant from the project. You can't control the output. You get star developers delivering 10x while other developers create more bugs than features. You get merge conflicts with two people working on the same feature without knowing. You get broken windows that nobody notices because everyone assumes someone else will fix it.

I'm not saying companies with big teams don't work. That would be dumb. What I'm saying is: big teams work only when they're well-structured and divided into small, self-managed squads. Each squad acts like a small team with ownership over their part of the codebase.

In small teams, broken windows are harder to hide. Everyone sees the mess. There's social pressure to keep things clean. If you commit something sloppy, your three teammates will notice. In a team of 30, your sloppy commit disappears into the noise.

## Tools: Linters, SonarQube, AI Code Reviews

Let's talk about tools. Linters, SonarQube, AI-powered code reviews. Do they actually prevent broken windows, or do they just create noise?

It depends.

If well implemented and properly configured, these tools can help catch issues before they become broken windows. A linter can enforce consistent code style. SonarQube can catch code smells and security vulnerabilities. AI code reviews can suggest improvements.

But if you just set them up without fine-tuning, "just to have them," they produce nothing but noise. False positives. Irrelevant warnings. Rules that don't apply to your codebase. Developers start ignoring the warnings because 90% of them are useless, and then they miss the 10% that actually matter.

The human-in-the-loop is crucial. Always. The tools are just that: tools to help you. They're not a replacement for code reviews, architecture discussions, or team culture.

I've seen teams over-rely on tools and lose the human element. "The linter passed, so the code must be good." No. The linter checked syntax and style. It didn't check if your logic makes sense, if your architecture is solid, or if you're solving the right problem.

Tools can catch broken windows, but they can't fix the culture that creates them.

## What Actually Works

So what works to prevent and fix broken windows? There's no golden rule. Each company is different, each team is different.

But here's what I've seen work:

**Code review culture.** Not just rubber-stamping approvals, but actual thoughtful reviews where people care about code quality. This only works if reviewers have time to review properly and if the team values quality over speed.

**The Boy Scout rule.** Leave code better than you found it. If you touch a file, clean it up a little. This compounds positively over time, the opposite of broken windows.

**Regular refactoring.** Not "refactoring sprints" where you stop feature work for a week, but continuous small refactorings as part of normal development. Most teams skip this because it's not visible to users, but it's essential for long-term code health.

**Strong coding standards.** Everyone agrees on a style and follows it. I don't care if you prefer single quotes over double quotes or tabs over spaces. Use whatever you want on your side projects. At work, let's all agree on one style and move on. Let's not waste hours discussing things that don't bring value. Remember, we're building software. What we sell is software. The end user doesn't care if we use spaces or tabs, C# or TypeScript. They want a useful, secure, reliable, and bug-free application.

**Team composition matters.** A team with a lot of juniors could benefit from pair programming. A team with more seniors might benefit more from code reviews than pairing. Know your team and adjust accordingly.

**Cultural alignment.** This is the most important and hardest to achieve. Everyone on the team needs to care about code quality. If one person doesn't care, their broken windows will spread. If the tech lead doesn't care, forget it. The whole team will follow.

## What Doesn't Work

Here's what I've seen fail:

**Ignoring small problems because you're busy.** That TODO comment will still be there in 2 years. That skipped test will become ten skipped tests. That type error will multiply.

**Tools without enforcement.** Having a linter that people can ignore. Having tests that people can skip. Having standards that aren't enforced in code reviews. If the tools are optional, they're useless.

**Blaming individuals instead of fixing the system.** If one developer keeps writing bad code, that's a problem. But if ten developers are writing bad code, that's a system problem. Your CI/CD is weak, your code reviews are shallow, or your standards aren't clear.

**Big refactoring sprints that never happen.** "We'll clean this up next quarter." No, you won't. You'll have new features to build, new fires to fight. If you want to fix broken windows, fix them incrementally as you go.

## The Cultural Problem

At the end of the day, broken windows are a cultural problem, not a technical one.

You can have the best tools, the strictest CI/CD, the most thorough code reviews. But if the team culture accepts shortcuts, broken windows will appear.

Culture starts from the top. If the tech lead commits code without tests, the team will too. If senior developers ignore type errors, juniors will learn that type errors don't matter. If the team treats code quality as optional, it becomes optional.

Building a culture that prevents broken windows requires:

1. **Lead by example.** Write good code. Follow the standards you set. Don't ask others to do things you won't do.

2. **Make quality visible.** Celebrate clean code. Call out good refactorings in code reviews. Make it clear that code quality is valued, not just feature velocity.

3. **Empower people to fix windows.** If someone sees a broken window, they should feel empowered to fix it, not wait for permission. If your culture punishes people for "wasting time on refactoring," broken windows will pile up.

4. **Have hard lines.** Some things are non-negotiable. For me, it's tests for critical paths and typecheck passing. Whatever your hard lines are, enforce them consistently.

5. **Make it easy to do the right thing.** If writing a test takes 30 minutes because your test setup is complicated, people will skip tests. If committing code requires 15 minutes of waiting for CI, people will find ways around it. Remove friction for good practices.

## My Take

After almost six years of writing software professionally, here's what I believe:

Broken windows are inevitable. You can't prevent all of them. Code will get messy. Shortcuts will happen. Technical debt will accumulate.

The question is: what do you do about it?

Do you accept it as "that's just how things are"? Do you let it compound until the codebase is unmaintainable? Or do you actively fight against it?

I've seen both approaches. I've worked on codebases where broken windows were everywhere, and making any change felt like navigating a minefield. I've also worked on codebases where the team actively maintained quality, and shipping new features was actually enjoyable.

The difference wasn't the technology or the tools. It was the culture.

If you're a developer on a team, you have power to prevent broken windows. Write tests. Fix the code you touch. Point out issues in code reviews. Care about your craft.

If you're a tech lead, you have even more power. Set the standards. Enforce them. Build a culture where quality matters. Make it easy for your team to do the right thing.

And if you're in a situation where broken windows are everywhere and nobody cares? That's tough. You can try to fix things incrementally, but if the culture doesn't support it, you might be fighting a losing battle. Sometimes the best thing you can do is find a team that actually cares about code quality.

Because working in a codebase full of broken windows, where every change breaks something else, where deploying means praying nothing explodes, that's not a career. That's just suffering.

Life's too short to work in a codebase where nobody cares.

## Final Thoughts

The broken window theory taught me that small things matter. One skipped test leads to ten skipped tests. One disabled typecheck leads to a week of fixing type errors. One TODO comment leads to fifty TODO comments.

But it also works in reverse. One good refactoring inspires another. One thorough code review sets a standard. One person caring about quality can influence the whole team.

You don't need to fix everything at once. You don't need a perfect codebase (that doesn't exist). But you do need to care. You need to fix the small windows before they turn into big problems.

Start with yourself. Write better code. Review thoughtfully. Refactor when you can. Lead by example.

The broken windows in your codebase didn't appear overnight, and they won't disappear overnight either. But if you and your team commit to fixing them one at a time, the codebase will get better.

Or you can ignore them, and watch everything slowly deteriorate.

Your choice.
